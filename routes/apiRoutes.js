const router = require('express').Router();
const savedData = require('../db/savedData')

router.get('/notes', function(req, res) {
    savedData
    .retrieveNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err))
});

router.post('/notes', (req, res) => {
    savedData
    .addNote(req.body)
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});

module.exports = router;