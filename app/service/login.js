const Service = require('egg').Service;

class LoginService extends Service {
  async find(uid) {
    const { mysql } = this.app;
    const user = await mysql.select('reg_user');
    return user
  }
}

module.exports = LoginService;