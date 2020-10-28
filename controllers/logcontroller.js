const router = require('express').Router();
const Log = require('../db').import('../models/log');

const validateSession = require('../middleware/validate-session');

//post a new workout

router.post('/', validateSession, (req, res) => {
    // console.log('controller request ---->', req)
    const LogEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner: req.user.id
    }
    console.log("log entry--->", LogEntry)
    Log.create(LogEntry)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
})

//get entries by user
router.get('/', validateSession, (req, res) => {
    let userid = req.user.id;
    Log.findAll({
        where: { owner: userid }
    })
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
})



//get entries by id
router.get('/:id', validateSession, (req, res) => {
    let userid = req.user.id;
    let id = req.params.id;

    Log.findOne({
        where: { owner: userid } && { id: id }
    })
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
})


//get entries by id
router.put('/:id', validateSession, (req, res) => {
    let userid = req.user.id;
    let id = req.params.id;

    const UpdatedLogEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
    }

    const search = { where: { owner: userid } && { id: id } }

    Log.update(UpdatedLogEntry, search)

        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
})


//get delete entry by id
router.delete('/:id', validateSession, (req, res) => {
    let userid = req.user.id;
    let id = req.params.id;

    const search = { where: { owner: userid } && { id: id } }

    Log.destroy(search)

        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
})

module.exports = router;