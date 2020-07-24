'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 被动调用-存储
  router.post('/insert', '/interface/insert', controller.interface.insert);
  // 主动调用-查询-推送
  router.post('/query', '/interface/query', controller.interface.query);
  // 测试
  router.post('/test', '/interface/test', controller.interface.test);
};
