const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

function find() {
    return db('cohorts');
}


module.exports = {
    find
};
