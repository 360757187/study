'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // mysql
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  // rest
  rest: {
    enable: false,
    package: 'egg-rest',
  },
};
