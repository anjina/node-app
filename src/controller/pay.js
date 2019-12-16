const Base = require('./base.js');
const fs = require('fs');
const path = require('path');

module.exports = class extends Base {
  async getAction() {
    let data;

    const storeId = this.header('storeid');
    const where = {
      storeId,
    }

    const type = this.get('type');
    const dates = this.formatTime(type);

    if(dates) {
      where.date = { '<': dates[1], '>': dates[0] };
    }

    think.logger.info('date', `${dates[0]} - ${dates[1]}`);

    const page = this.get('page');
    const limit = this.get('limit');
    if(page && limit) {
      data = await this.model('pay_record')
        .where(where)
        .order('id DESC')
        .page(page, limit)
        .countSelect();
    } else {
      data = await this.model('pay_record')
        .where(where)
        .order('id DESC')
        .select();
    }
    
    return this.success(data);  
  }
  
  async postAction() {
    const { form } = this.post();
    const storeId = this.header('storeid');
    const uid = this.header('uid');
    
    let imgs = (form.images && form.images.split('||')) || '';
    if(imgs && imgs.length) {
      imgs = await Promise.all(imgs.map(img => this.handleImg(img)));
    }

    const common = {
      storeId,
      creator: uid
    }

    const formData = {
      ...form,
      imgsUrl: imgs ? imgs.join(',') : '',
      ...common,
    }

    const labelData = {
      name: form.label,
      ...common,
    }

    const id = await this.model('pay_record').add(formData);
    const data = await this.model('pay_record').where({ id }).find();

    await this.model('label').thenUpdate(labelData, { name: labelData.name, storeId: labelData.storeId })
    return this.success(data);
  }

  async putAction() {
    const { id, form } = this.post();
    if(think.isEmpty(id)) {
      return this.fail('id不能为空');
    }

    const affectRows = await this.model('pay_record')
      .where({ id })
      .update(form)
    
    const data = await this.model('pay_record').where({ id }).find();
    
    return this.success(data);
  }

  writeToFile(path, data) {
    return new Promise(function(resolve, reject) {
      fs.writeFile(path, data, function(err) {
        if(err){
          reject(err);
        } else{
          resolve();
        }
      });
    })
  }

  async handleImg(item) {
    if(item) {
      try {
        const now = Date.now();
        const base64Data = item.replace(/^data:image\/\w+;base64,/, "");
        const dataBuffer = Buffer.from(base64Data, 'base64'); // 这是另一种写法
        const filePath = path.join(__dirname, `../../www/static/image/pay/${now}.jpg`);

        await this.writeToFile(filePath, dataBuffer);
        return `/static/image/pay/${now}.jpg`
      } catch (error) {
        console.error(error);
      }
    }
  }

  formatTime(type) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? ('0' + date.getMonth()) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();

    const start = {
      year,
      month,
      day: 16,
    }
    const end = {
      year,
      month,
      day: 15,
    };

    if(type == 0) {
      return [
        `${year}-${month}-${day} 00:00:00`, 
        `${year}-${month}-${day} 23:59:59`
      ];
    }

    if(type == 1) {
      end.month = day > 15 ? end.month + 1 : end.month;
      start.month = day > 15 ? start.month : start.month - 1;
    } else if(type == 2) {
      start.month = day > 15 ? start.month - 1 : start.month - 2;
      end.month = day > 15 ? end.month : end.month - 1;
    } else {
      return false;
    }

    if(start.month < 1) {
      start.month += 12;
      start.year -= 1;
    }

    if(end.month > 12) {
      end.month -= 12;
      end.year += 1;
    }

    return [
      `${start.year}-${start.month}-${start.day} 00:00:00`, 
      `${end.year}-${end.month}-${end.day} 23:59:59`
    ];
  }
};
