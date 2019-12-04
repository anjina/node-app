const Base = require('./base.js');

module.exports = class extends Base {
  async getAction() {
    const userModel = this.model('user');
    const pk = userModel._pk;
    let data;

    if (this.id) {
      data = await userModel.where({
        [pk]: this.id
      }).find();

      return this.success(data);
    }

    const where = {};
    let query = this.get('query');

    if (query) {
      query = JSON.parse(query);
      if (query.keyword) {
        where.nickName = ['like', `%${query.keyword}%`];
      }
    }

    const page = this.get('page');
    const limit = this.get('limit');

    if (page && limit) {
      data = await userModel
        .where(where)
        .page(page)
        .limit(limit)
        .select();
    } else {
      data = await userModel
        .where(where)
        .select();
    }

    return this.success(data);
  }

  async putAction() {
    try {
      const options = this.post('options');
      const userModel = this.model('user');
      const phoneNum = this.header('uid');
      const user = this.post('user')

      if(user) {
        await userModel.where({ phoneNum: user }).update(options);
      } else {
        await userModel.where({ phoneNum }).update(options);
      }
      
      return this.success(user || phoneNum);
    } catch (error) {
      return this.fail(error);
    }
  }
};
