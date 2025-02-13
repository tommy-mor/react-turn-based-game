const WebSocket = require("ws");
const Rooms = require("../engine/rooms");
const Users = require("../engine/users");

function broadcast(wss, message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

function updateUsers(wss, message, { roomName }) {
  broadcast(wss, { type: "users", payload: Rooms.getUsers(roomName) });
}

function connect(wss, message, { roomName, userId }) {
  Rooms.joinRoom(roomName, userId);
  updateUsers(wss, message, { roomName });
}

function disconnect(wss, message, { roomName, userId }) {
  Rooms.leaveRoom(roomName, userId);
  updateUsers(wss, message, { roomName });
}

function spectate(wss, message, { roomName, userId }) {
  Rooms.setSpectate(roomName, userId, true);
  updateUsers(wss, message, { roomName });
}

function unspectate(wss, message, { roomName, userId }) {
  Rooms.setSpectate(roomName, userId, false);
  updateUsers(wss, message, { roomName });
}

function banUser(wss, message, { roomName, userId }) {
  Rooms.banUser(roomName, userId, message.payload.toBanId);
  updateUsers(wss, message, { roomName });
}

function changeName(wss, message, { roomName, userId }) {
  Users.setName(userId, message.payload.name);
  updateUsers(wss, message, { roomName });
}

function modUnspectate(wss, message, { roomName, userId }) {
  Rooms.modSetSpectate(roomName, userId, message.payload.id, false);
  updateUsers(wss, message, { roomName });
}

function unspectateAll(wss, message, { roomName, userId }) {
  Rooms.unspectateAllUsers(roomName, userId);
  updateUsers(wss, message, { roomName });
}

function nominateMod(wss, message, { roomName, userId }) {
  Rooms.nominateMod(roomName, userId, message.payload.id);
  updateUsers(wss, message, { roomName });
}

const socketActions = {
  connect,
  disconnect,
  updateUsers,
  spectate,
  unspectate,
  banUser,
  changeName,
  modUnspectate,
  unspectateAll,
  nominateMod,
};

module.exports = socketActions;
