/* eslint valid-jsdoc: "off" */

'use strict';
const { mysql } = require('./config.mysql');
const { redis } = require('./config.redis');
const serverConfig = require('./config.server');
const middlewareConfig = require('./config.middleware');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    mysql,
    redis
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_regexp';

  // add your user config here
  const userConfig = {
    myAppName: 'reg',
    cluster: {
      listen: {
        port: 8888
      }
    },
    session: {
      key: 'REG_SESS',
      ...serverConfig.COOKIE,
      // renew: true
    }
  };
  return {
    ...config,
    ...userConfig,
    ...serverConfig,
    ...middlewareConfig
  };
};
