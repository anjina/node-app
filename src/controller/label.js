const Base = require('./base.js');

module.exports = class extends Base {
  async getAction() {
    const uid = this.header('uid');
    const storeId = this.header('storeid') || null;
    const labelModel = this.model('label');
    let data;
    if(storeId) {
      data = await labelModel.where({ storeId }).select();
    } else {
      data = await labelModel.where({ creator: uid }).select();
    }

    return this.success(data);
  }

  async postAction() {
    const storeId = this.header('storeId') || null;
    const uid = this.header('uid');
    const { labels } = this.post();
    const labelModel = this.model('label');
    const list = labels.split(',');
    
    const addData = list.map(item => {
      return {
        name: item,
        creator: uid,
        storeId: storeId
      }
    });

    const affectedRows = labelModel.addMany(addData);

    return this.success(affectedRows);
  }

  async putAction() {}

  async deleteAction() {}
};
