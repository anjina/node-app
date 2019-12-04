const Base = require('./base.js');
const fs = require('fs')
const path = require('path')
module.exports = class extends Base {
  async postAction() {
    try {
      const { data } = this.post();
      const uid = this.header('uid');
      const base64Data = data.replace(/^data:image\/\w+;base64,/, "");
      const dataBuffer = Buffer.from(base64Data, 'base64'); // 这是另一种写法
      const filePath = path.join(__dirname, `../../www/static/image/avatar_${uid}.png`)

      await this.writeToFile(filePath, dataBuffer);
      await this.model('user').where({ phoneNum: uid }).update({ avatar: `/static/image/avatar_${uid}.png` });
      return this.success({
        imgUrl: `/static/image/avatar_${uid}.png`
      });
    } catch (error) {
      return this.fail(error); 
    }
  }

  writeToFile(path, data) {
    return new Promise(function(resolve, reject) {
      fs.writeFile(path, data, function(err) {
        if(err){
          reject(err);
        } else{
          resolve();
        }
      });
    })
  }
};
