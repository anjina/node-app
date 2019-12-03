const clients = {}
module.exports = class extends think.Controller {
  constructor(...arg) {
    super(...arg);
  }

  openAction() {
    const socket = this.websocket
    const { query: { phoneNum } } = socket.handshake;
    const id = socket.id
    clients[phoneNum] = id
    this.emit('opend', 'This client opened successfully!')
    this.broadcast('count', `All: ${Object.keys(clients).length}`);
  }

  closeAction() {
    const id = this.websocket.id
    for(const [key, value] of Object.entries(clients)) {
      if(value === id) {
        delete clients[key];
      }
    }
    this.broadcast('count', `All: ${Object.keys(clients).length}`);
  }

  async talkAction() {
    const { fromId, toId, type, message } = this.wsData;
    const msgModel = this.model('message');
    const id = clients[toId];
    // 如果在线
    if(id) {
      this.websocket.to(id).emit('newMsg');
    }
    // 存入数据库
    await msgModel.add(
      {
        fromId,
        toId,
        type,
        message
      }
    );
  }
}