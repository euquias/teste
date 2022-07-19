const admin = require('./admin')

module.exports = app => {
  app.post('/signup', app.api.user.save)
  app.post('/signin', app.api.auth.signin)
  app.post('/validateToken', app.api.auth.validateToken)

  app.route('/users')
   /* .all(app.config.passport.authenticate())  */
    .post(app.api.user.save)
    .get(app.api.user.get)

  app.route('/users/:id')
    .all(app.config.passport.authenticate())
    .put(admin(app.api.user.save))
    .get(admin(app.api.user.getById))
    .delete(admin(app.api.user.remove))

  app.route('/produtos')
   /* .all(app.config.passport.authenticate()) */   
    .post(app.api.produto.save)
    .get(app.api.produto.get)

  app.route('/produtos/:id')
      /* .all(app.config.passport.authenticate())   */
    .get(app.api.produto.getById)
    .delete(app.api.produto.remove)
    .put(app.api.produto.save)

  /* app.route('/stats')
   .all(app.config.passport.authenticate())
  .get(app.api.stat.get) */
}