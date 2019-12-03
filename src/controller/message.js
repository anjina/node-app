const Base = require('./base.js');

module.exports = class extends Base {
  async getAction() {
    try {
      const { phoneNum } = this.get();
      const msgModel = this.model('message');

      const data = await msgModel
        .where(
          {
            toId: phoneNum,
            status: 0,
          }
        )
        .order('id DESC')
        .select();
      
      return this.success(data);
    } catch (error) {
      return this.fail(error);
    }
  }
};
