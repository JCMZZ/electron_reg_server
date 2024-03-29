'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx, service, app } = this;
    try {
      ctx.validate({
        email: {type: 'email', allowEmpty: false},
        pwd: {type: 'password', allowEmpty: false}
      });
      /**
       * 账户是否存在
       */
      let isRegister = await service.login.validateAccount(ctx.request.body.email);
      if(!isRegister) {
        ctx.fail = { result: isRegister, message: 'Unregistered account！' };
        return 
      }
      /**
       * 查询帐户信息
       */
      try {
        let { update_time, create_time, state, pwd, ...user} = await service.login.validateUser(ctx.request.body);
        let roles = await service.common.roles(user.user_id);
        let navs = await service.common.navs(roles.map(r=>r.role_id).join(','));
        await ctx.helper.Rset(ctx.helper.crypto(user.email), {user, roles, navs});
        ctx.helper.setCookie(user.email);
        service.common.log({
          module: 'system',
          desc: '登陆系统'
        }, user);
        ctx.success = {result: {user, roles, navs}};
      } catch (err) {
        ctx.fail = {result: err, message: 'The password is incorrect！'};
      }
    } catch (err) {
      ctx.fail = {result: err, ...ctx.helper.verify_er(err)};
    }
  }
}

module.exports = LoginController;
