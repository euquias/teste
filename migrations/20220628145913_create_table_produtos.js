
exports.up = function(knex) {
    return knex.schema.createTable('produtos', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.integer('price').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('produtos')
};
