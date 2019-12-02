const Base = require('./base.js');
const generateToken = require('../config/token').generateToken
module.exports = class extends Base {
  // 注册
  async postAction() {
    const { phoneNum, password } = this.post();
    const userModel = this.model('user');

    try {
      // 查询是否已有用户
      const originData = await userModel.where({
        phoneNum
      }).find()

      if(think.isEmpty(originData)) {
        const newId = await userModel.add(
          {
            phoneNum,
            password,
            nickName: 'Dialy' + Math.floor(Date.now() / 1000),
            sign: '此人很懒，什么都没有留下'
          }
        );
        const userInfo = await userModel.where({ id: newId }).find();
        const token = generateToken(phoneNum);
        return this.success({
          ...userInfo,
          token
        })
      } else {
        return this.fail(201);
      }
    } catch (error) {
      return this.fail(error);
    }
  }
};
