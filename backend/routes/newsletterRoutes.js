const express = require('express');
const router = express.Router();
const {
  addNewsletter,
  getAllNewsletter,
  deleteNewsletter,
  deleteManyNewsletter,
} = require('../controller/newsletterController');

// subscribe to newsletter
router.post('/add', addNewsletter);

// get all subscribers
router.get('/', getAllNewsletter);

// delete many subscribers
router.patch('/delete/many', deleteManyNewsletter);

// unsubscribe
router.delete('/:id', deleteNewsletter);

module.exports = router;
