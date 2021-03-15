exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send({embed: {
    description: "Bunu Sunucu Sahibi Kullanabilir!"
  }});
  const db = require('../db.js');
  db.clear();
  message.channel.send('Silindi!')
}