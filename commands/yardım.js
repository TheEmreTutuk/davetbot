exports.run = async (client, message, args) => {
    const prefix = process.env.prefix
    message.channel.send({embed: {
        description: `\`${prefix}davetekle <Kişi> <Miktar>\` Kişiye Daveti Sayısı Verir. \n\`${prefix}yardım\` Komutları Gösterir.\n\`${prefix}davetlerim <Kişi>\` Davetlerini Gösterir Yada Başkasının Daveti.\n\`${prefix}davetsil <Kişi> <Miktar>\` Kişinin Davet Sayısını Siler.\n\`${prefix}davetsıfırla\` Sunucuda İçeren Tüm Davetleri Sıfırlanır.\n\`${prefix}worksüresi\` Bot Ne Kadardır Açık Olduğunu Gösterir.`,
        color: 44678,
    }})
}