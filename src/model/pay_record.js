module.exports = class extends think.Model {
  get relation() {
    return {
      user: {
        type: think.Model.HAS_ONE,
        key: 'creator',
        fKey: 'phoneNum',
        name: 'creatorInfo'
      }
    }
  }
};