module.exports = class extends think.Model {
  get relation() {
    return {
      node_lang: {
        type: think.Model.HAS_MANY,
        key: 'id',
        fKey: 'nodeId'
      }
    }
  }
};
