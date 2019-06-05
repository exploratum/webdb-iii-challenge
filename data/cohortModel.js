const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

function find() {
    return db('cohorts');
}

function findById(id) {
    return db('cohorts')
    .where({id})
    .first();
}

function findStudentsByCohortId(cohort_id) {
    return db('students')
        .where({cohort_id});
}

function insert(cohort) {
    return db('cohorts').insert(cohort);
}

function update(id, changes) {
    return db('cohorts')
    .where({id})
    .update(changes)
}

function remove(id) {
    return db('cohorts')
    .where({id})
    .del();
}


module.exports = {
    find,
    findById,
    insert,
    update,
    remove,
    findStudentsByCohortId
};
