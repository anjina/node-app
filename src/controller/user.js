const Base = require('./base.js');

module.exports = class extends Base {
  async putAction() {
    try {
      const options = this.post('options');
      const userModel = this.model('user');
      const phoneNum = this.header('uid');

      await userModel.where({ phoneNum }).update(options);
      return this.success(phoneNum);
    } catch (error) {
      return this.fail(error);
    }
  }
};
