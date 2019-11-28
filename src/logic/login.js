module.exports = class extends think.Logic {
  getAction() {
    this.rules = {
      phoneNum: {
        required: true,
        string: true,
        length: 11,
        trim: true,
      }
    }
  }

  postAction() {
    this.rules = {
      phoneNum: {
        required: true,
        string: true,
        length: 11,
        trim: true,
      }
    }
  }
};