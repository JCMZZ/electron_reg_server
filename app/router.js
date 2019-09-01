'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/login', controller.login.index);
  router.post('/create/user', controller.register.createUser);
  router.post('/home', controller.home.index);
};
