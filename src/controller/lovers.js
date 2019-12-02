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
        where.keyword = ['like', `%${query.keyword}%`];
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
};
