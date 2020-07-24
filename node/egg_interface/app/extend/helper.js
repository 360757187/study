'use strict';

module.exports = {
  async initAmqplib(queueName) {
    // this 是 helper 对象，在其中可以调用其他 helper 方法
    // this.ctx => context 对象
    // this.app => application 对象
    const ch = await this.app.amqplib.createChannel();
    await ch.assertQueue(queueName, { durable: true });
    console.log('订阅成功！');
    ch.consume(queueName, async msg => {
      console.log(msg.content.toString());
      const newsList = await this.service.news.artists();
      // await this.ctx.render('movies/list.tpl', { list: newsList.data });
      console.log(newsList);
      ch.ack(msg);
    });
  },
};
