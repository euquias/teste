module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validestion

    const save = (req, res) => {
        const produto = { ...req.body }
        if (req.params.id) produto.id = req.params.id

        try {
            existsOrError(produto.name, { message: 'produto não informado' })
            existsOrError(produto.price, { message: 'valor não informado' })
        } catch (msg) {
            return res.status(400).send(msg)
        }
        if (produto.id) {
            app.db('produtos')
                .update(produto)
                .where({ id: produto.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('produtos')
                .insert(produto)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const get = (req, res) => {
        app.db('produtos')
            .select('id', 'name', 'price',)
            .then(produtos => res.json(produtos))
            .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {
        app.db('produtos')
            .select('id', 'name', 'price',)
            .where({ id: req.params.id })
            .first()
            .then(produtos => res.json(produtos))
            .catch(err => res.status(500).send(err))
    }
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('produtos')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Produto  não foi encontrada.')
            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }
    return { save, get, getById, remove }
}