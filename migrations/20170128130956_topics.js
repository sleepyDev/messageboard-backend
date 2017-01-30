
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('topics', function(table) {
            table.increments('id').primary()
            table.string('name')
            table.string('desc', 1000)
            table.timestamps()
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('topics')
    ])
};
