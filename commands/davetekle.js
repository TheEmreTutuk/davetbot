exports.run = async (client, message, args) => {
  const db = require('../db.js');
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send({embed: {
      description: `Yetkili Değilsin!`,
      footer: {
        text: client.user.username,
        icon_url: client.user.displayAvatarURL()
      },
      color: 44678,
      timestamp: new Date()
    }})
  }
  let mention =
    (await message.mentions.members.first()) ||
    (await message.guild.members.cache.get(args[0]));
  if(mention) {
    if(args[1]) {
      const invites = await db.get(mention.id)
      if(invites) {
        const newamount = +invites + +args[1]
        if(newamount.toString() == 'NaN') {
          message.channel.send({embed: {
            description: `Miktarı Girin.`,
            footer: {
              text: client.user.username,
              icon_url: client.user.displayAvatarURL()
            },
            color: 44678,
            timestamp: new Date()
          }})
        } else {
          db.set(mention.id, newamount)
          message.channel.send({embed: {
            description: `Eklendi ${args[1]} Davet Sayısı <@${mention.id}>! Simdi ${newamount} Daveti Var!`,
            footer: {
              text: client.user.username,
              icon_url: client.user.displayAvatarURL()
            },
            color: 44678,
            timestamp: new Date()
          }})
        }
      } else {
        const newamount = +0 + +args[1]
        if(newamount.toString() == 'NaN') {
          message.channel.send({embed: {
            description: `Bu Miktar Değil.`,
            footer: {
              text: client.user.username,
              icon_url: client.user.displayAvatarURL()
            },
            color: 44678,
            timestamp: new Date()
          }})
        } else {
          db.set(mention.id, newamount)
          message.channel.send({embed: {
            description: `Eklendi ${args[1]} Davet Sayısı <@${mention.id}>! Simdi ${newamount} Daveti Var!`,
            footer: {
              text: client.user.username,
              icon_url: client.user.displayAvatarURL()
            },
            color: 44678,
            timestamp: new Date()
          }})
        }
      }
    } else {
      message.channel.send({embed: {
        description: `Miktari Girin`,
        footer: {
          text: client.user.username,
          icon_url: client.user.displayAvatarURL()
        },
        color: 44678,
        timestamp: new Date()
      }})
    }
  } else if(args[0]) {
    const membersearch = await message.guild.members.fetch({ query: args[0], limit: 1 })
    let found = membersearch.first()
    if(found) {
      if(args[1]) {
        const invites = await db.get(found.id)
        if(invites) {
          const newamount = +invites + +args[1]
          if(newamount.toString() == 'NaN') {
            message.channel.send({embed: {
              description: `Bu Miktar Değil.`,
              footer: {
                text: client.user.username,
                icon_url: client.user.displayAvatarURL()
              },
              color: 44678,
              timestamp: new Date()
            }})
          } else {
            const question = message.channel.send({embed: {
              description: `Do you want to give these invites to <@${found.id}> (${found.user.tag})?`,
              footer: {
                text: `${client.user.username} • Options: yes | no`,
                icon_url: client.user.displayAvatarURL()
              },
              color: 44678,
              timestamp: new Date()
            }})
            let filter = (question) => question.author.id === message.author.id;
            message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async collected => {
              if (collected.size === 0) {
                message.channel.send({
                  embed: {
                    description: `Uzun Sürdü.`,
                    color: 16733013,
                    author: {
                      name: message.author.tag,
                      icon_url: message.author.displayAvatarURL()
                    }
                  }
                });
              } else {
                let answer = collected.first().content.toLowerCase();
                if(answer === 'yes') {
                  db.set(found.id, newamount)
                  message.channel.send({embed: {
                    description: `Eklendi ${args[1]} Davet Sayısı <@${found.id}>! Simdi ${newamount} Daveti Var!`,
                    footer: {
                      text: client.user.username,
                      icon_url: client.user.displayAvatarURL()
                    },
                    color: 44678,
                    timestamp: new Date()
                  }})
                } else {
                  if(answer === 'no') {
                  message.channel.send({embed: {
                    description: `Davet Eklenmedi.`,
                    footer: {
                      text: client.user.username,
                      icon_url: client.user.displayAvatarURL()
                    },
                    color: 44678,
                    timestamp: new Date()
                  }})
                } else {
                  message.channel.send({embed: {
                    description: `Bu Geçerli Bir Seçenek Değil!`,
                    footer: {
                      text: client.user.username,
                      icon_url: client.user.displayAvatarURL()
                    },
                    color: 44678,
                    timestamp: new Date()
                  }})
                }
                }
              }
            })
          }
        } else {
          const newamount = +0 + +args[1]
          if(newamount.toString() == 'NaN') {
            message.channel.send({embed: {
              description: `Bu Miktar Değil!`,
              footer: {
                text: client.user.username,
                icon_url: client.user.displayAvatarURL()
              },
              color: 44678,
              timestamp: new Date()
            }})
          } else {
            const question = message.channel.send({embed: {
              description: `Bu Davetleri Bu Kişiye mi Vermek İstedin <@${found.id}> (${found.user.tag})?`,
              footer: {
                text: `${client.user.username} • seçenek: yes | no`,
                icon_url: client.user.displayAvatarURL()
              },
              color: 44678,
              timestamp: new Date()
            }})
            let filter = (question) => question.author.id === message.author.id;
            message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async collected => {
              if (collected.size === 0) {
                message.channel.send({
                  embed: {
                    description: `Uzun Sürdü.`,
                    color: 16733013,
                    author: {
                      name: message.author.tag,
                      icon_url: message.author.displayAvatarURL()
                    }
                  }
                });
              } else {
                let answer = collected.first().content.toLowerCase();
                if(answer === 'yes') {
                  db.set(found.id, newamount)
                  message.channel.send({embed: {
                    description: `Eklendi ${args[1]} Davet Sayısı <@${found.id}>! Simdi ${newamount} Daveti Var!`,
                    footer: {
                      text: client.user.username,
                      icon_url: client.user.displayAvatarURL()
                    },
                    color: 44678,
                    timestamp: new Date()
                  }})
                } else {
                  if(answer === 'no') {
                  message.channel.send({embed: {
                    description: `Davet Eklenmedi`,
                    footer: {
                      text: client.user.username,
                      icon_url: client.user.displayAvatarURL()
                    },
                    color: 44678,
                    timestamp: new Date()
                  }})
                } else {
                  message.channel.send({embed: {
                    description: `Bu Geçerli Bir Seçenek Değil.`,
                    footer: {
                      text: client.user.username,
                      icon_url: client.user.displayAvatarURL()
                    },
                    color: 44678,
                    timestamp: new Date()
                  }})
                }
                }
              }
            })
          }
        }
      } else {
        message.channel.send({embed: {
          description: `Miktari Girin.`,
          footer: {
            text: client.user.username,
            icon_url: client.user.displayAvatarURL()
          },
          color: 44678,
          timestamp: new Date()
        }})
      }
      } else {
        message.channel.send({embed: {
          description: `Böyle Bir Kişi Bulunmadı!`,
          footer: {
            text: client.user.username,
            icon_url: client.user.displayAvatarURL()
          },
          color: 44678,
          timestamp: new Date()
        }})
      }
    } else {
      message.channel.send({embed: {
        description: `Kime Daveti Vereceksin?`,
        footer: {
          text: client.user.username,
          icon_url: client.user.displayAvatarURL()
        },
        color: 44678,
        timestamp: new Date()
      }})
    }
}