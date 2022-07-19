const bcrypt = require('bcrypt')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validestion
    
    const encryptPasswod = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id 

        try {
            existsOrError(user.name,{message:'nome não informado'})
            existsOrError(user.email,{message:'E-mail não informado'})
            existsOrError(user.password,{message: 'senha não informada'})
            existsOrError(user.confirmPassword,{message: 'confirmação de senha invalida'})
            equalsOrError(user.password, user.confirmPassword,{message: 'senhas não confere'})

            const userFromdb = await app.db('users')
                .where({ email: user.email }).first()
            if (user.id) {
                notExistsOrError(userFromdb,{message:'usuario ja foi cadastrado'})
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }
        user.password = encryptPasswod(user.password)
        delete user.confirmPassword
        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deleteAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deleteAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deleteAt')
            .where({ id: req.params.id })
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles')
                .where({ userId: req.params.id })
            notExistsOrError(articles, 'usuario possui dados')
            const rowsUpdated = await app.db('users')
                .update({ deletedAt: Date() })
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'usuario não foi encontrado')

            res.status(204).send()

        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
    casa
}
