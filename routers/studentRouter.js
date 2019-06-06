const express = require('express');
const router = express.Router();

const studentModel = require('../data/studentModel');



/****************************************/
/*          Get all students            */
/****************************************/
router.get('/', async (req,res) => {
    try {
        const students = await studentModel.find();
        res.status(200).json(students);
    }
    catch {
        res.status(500).json({errorMessage: "Can not get records form database"})
    }
})

/*****************************************************************/
/*           Get Student by its id and add cohort name           */
/****************************************************************/

router.get('/:id', validateId, async (req, res) => {
    try {
        student = await studentModel.findById(req.params.id);
        res.status(200).json(student);
    }
    catch {
        res.status(500).json({"errorMessage": "Cannot get record from database"})
    }

});


/*****************************************/
/*        Insert a new student           */
/*****************************************/
router.post ('/', validateStudentInfo, async (req,res) => {
    const body = req.body;
    try {
        student = await studentModel.insert(body);
        res.status(201).json(student);
    }
    catch {
        res.status(500).json({"errorMessage": "That was a problem adding the record"})
    }
})

/**********************************************/
/*        Update an existing student          */
/**********************************************/
router.put('/:id', validateId, validateStudentInfo, async (req, res) => {
    try {
        count = await studentModel.update(req.params.id, req.body)
        res.status(200).json({"message": `${count} record(s) updated`});
    }
    catch {
        res.status(500).json({errorMesage: "There were an error updating record in database"});
    }
  })

/**********************************************/
/*        Delete an existing student            */
/**********************************************/

router.delete('/:id', validateId, async (req,res) => {
    const id = req.params.id;
    try {
        const count = await studentModel.remove(id);
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
/*       Validate student Id and save targeted student in req       */
/********************************************************************/

async function validateId(req, res, next) {
    const id = req.params.id;
    if(id) {
        try {
            const student = await studentModel.findById(id);
            if(student) {
                next();
            }
            else
                res.status(400).json({"errorMessage": "The provided id does not exist"})
        } 
        catch {
            res.status(500).json({"errorMessage": "That was a problem checking the id in the database"})
        }
    }
    else {
        res.status(400).json({"errorMessage": "You need to provide an id"})
    }
};

/****************************************/
/*        Validate cohort info          */
/****************************************/
async function validateStudentInfo(req,res, next) {
    const body = req.body;

    if(body.name && body.cohort_id) {
        next();
    }
    else {
        res.status(400).json({"errorMessage":"name and cohort_id are required"});
    }
}

module.exports = router


module.exports = router
