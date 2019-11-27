module.exports = class extends think.Logic {
  postAction() {
    this.allowMethods = 'post';
    this.rules = {
      phoneNum: {
        string: true,       // 字段类型为 String 类型
        required: true,     // 字段必填
        trim: true,         // 字段需要trim处理
        length: 11,
      },
      password: {
        string: true,       // 字段类型为 String 类型
        required: true,     // 字段必填
        trim: true,         // 字段需要trim处理
      }
    }
  }
};