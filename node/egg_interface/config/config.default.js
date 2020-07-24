/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1595313299045_3152';

  // add your middleware config here
  config.middleware = [
    'errorHandler',
  ];

  // 配置mysql
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '',
      // 端口号
      port: '',
      // 用户名
      user: '',
      // 密码
      password: '',
      // 数据库名
      database: '',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  //  只对 /interface 前缀的 url 路径生效
  config.errorHandler = {
    match: '/interface',
  };

  // 自定义加载器
  config.customLoader = {
    utils: {
      directory: 'app/utils',
      inject: 'app',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
