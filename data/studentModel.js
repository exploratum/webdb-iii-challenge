const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

function find() {
    return db('students');
}

function findById(id) {

    return db.select('students.id', 'students.name', 'cohorts.name AS cohort')
    .from('students')
    .leftJoin('cohorts', 'cohorts.id', 'students.cohort_id')
    .where({'students.id': id})

}

function insert(student) {
    return db('students').insert(student);
}

function update(id, changes) {
    return db('students')
    .where({id})
    .update(changes)
}

function remove(id) {
    return db('students')
    .where({id})
    .del();
}


module.exports = {
    find,
    findById,
    insert,
    update,
    remove,
};