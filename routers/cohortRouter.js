const express = require('express');
const router = express.Router();

const cohortModel = require('../data/cohortModel');

/****************************************/
/*          Get all cohorts             */
/****************************************/
router.get('/', async (req,res) => {
    try {
        const cohorts = await cohortModel.find();
        res.status(200).json(cohorts);
    }
    catch {
        res.status(500).json({errorMessage: "Can not get records form database"})
    }
})

/*****************************************************************/
/*                      Get cohort by it id                     */
/****************************************************************/

router.get('/:id', validateIdAndSaveCohort, async (req, res) => {
    const cohort = req.cohort;
    if (cohort)
        res.status(200).json(req.cohort);
    else 
        res.status(500).json({"errorMessage": "Cannot get record from database"})

});

/*****************************************************************/
/*           Get all students of a cohort by cohort id           */
/****************************************************************/

router.get('/:id/students', validateIdAndSaveCohort, async (req, res) => {
    try {
        students = await cohortModel.findStudentsByCohortId(req.params.id);
        console.log(students);
        res.status(200).json(students);
    }
    catch {
        res.status(500).json({"errorMessage": "Cannot get records from database"})
    }

});


/*****************************************/
/*        Insert a new cohort             */
/*****************************************/
router.post ('/', validateCohortInfo, async (req,res) => {
    const body = req.body;
    try {
        cohort = await cohortModel.insert(body);
        res.status(201).json(cohort);
    }
    catch {
        res.status(500).json({"errorMessage": "That was a problem adding the record"})
    }
})

/**********************************************/
/*        Update an existing cohort           */
/**********************************************/
router.put('/:id', validateIdAndSaveCohort, validateCohortInfo, async (req, res) => {
    try {
        count = await cohortModel.update(req.params.id, req.body)
        res.status(200).json({"message": `${count} record(s) updated`});
    }
    catch {
        res.status(500).json({errorMesage: "There were an error updating record in database"});
    }
  })


  /**********************************************/
/*        Delete an existing cohort            */
/**********************************************/

router.delete('/:id', validateIdAndSaveCohort, async (req,res) => {
    const id = req.params.id;
    try {
        const count = await cohortModel.remove(id);
        res.status(200).json(`message: ${count} record(s) deleted`);
    }
    catch {
        res.status(500).json({"errorMessage": "Record could not be deleted from database"});
    }
}) 


/********************************************************************************/
/*                              Custom Middleware                               */
/********************************************************************************/


/********************************************************************/
/*        Validate cohort Id and save targetd cohort in req         */
/********************************************************************/

async function validateIdAndSaveCohort(req, res, next) {
    const id = req.params.id;
    if(id) {
        try {
            const cohort = await cohortModel.findById(id);
            if(cohort) {
                req.cohort = cohort;
                next();
            }
                
            else
                res.status(400).json({"errorMessage": "This cohort id does not exist"})
        } 
        catch {
            res.status(500).json({"errorMessage": "That was a problem checking the id"})
        }
    }
    else {
        res.status(400).json({"errorMessage": "You need to provide an id"})
    }
};

/****************************************/
/*        Validate cohort info          */
/****************************************/
async function validateCohortInfo(req,res, next) {
    const body = req.body;

    if(body.name) {
        next();
    }
    else {
        res.status(400).json({"errorMessage":"name is reauired required"});
    }
}

module.exports = router