const express = require('express');
const router = express.Router();

const cohortModel = require('../data/cohortModel');


router.get('/', async (req,res) => {
    try {
        const cohorts = await cohortModel.find();
        res.status(200).json(cohorts);
    }
    catch {
        res.status(500).json({errorMessage: "Can not get cohorts form database"})
    }
})

module.exports = router