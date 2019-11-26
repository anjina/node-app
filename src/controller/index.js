const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  async getAction() {
    const event = this.model('node')
    const data = await event.select()
    return this.success(data);
  }
};
