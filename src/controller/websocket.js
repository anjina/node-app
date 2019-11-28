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
        return;
      }
    }
    this.broadcast('count', `All: ${Object.keys(clients).length}`);
  }

  talkAction() {
    const { phoneNum, message } = this.wsData
    const id = clients[phoneNum]
    this.websocket.to(id).emit('newMsg', message);
  }
}