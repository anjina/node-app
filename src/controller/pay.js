const Base = require('./base.js');
const fs = require('fs');
const path = require('path');

module.exports = class extends Base {
  async getAction() {
    const dates = this.formatTime(new Date());
    const storeId = this.header('storeid');

    const data = await this.model('pay_record')
      .where({
        date: { '<': dates[1], '>': dates[0] },
        storeId
      })
      .order('id DESC')
      .select();
    
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
      imgsUrl: imgs.join(','),
      ...common,
    }

    const labels = form.labels.split(',')
    const labelsData = labels.map(l => ({
      name: l,
      ...common
    }))

    const id = await this.model('pay_record').add(formData);
    const data = await this.model('pay_record').where({ id }).find();

    await Promise.all(labelsData.map(label => this.model('label').thenUpdate(label, { name: label.name, storeId: label.storeId })))
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

  formatTime(date) {
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? ('0' + date.getMonth()) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();

    return [`${year}-${month}-${day} 00:00:00`, `${year}-${month}-${day} 23:59:59`];
  }
};
