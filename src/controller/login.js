const Base = require('./base.js');

module.exports = class extends Base {
  // 注册
  async postAction() {
    // const event = this.model('user')
    // const data = await event.select()
    return this.success(1);
  }
};
