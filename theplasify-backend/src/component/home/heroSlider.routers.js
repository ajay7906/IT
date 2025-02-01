const express = require('express');
const router = express.Router();
const slideController = require('../home/heroSlider.controllers');

router.get('/getAllslides', slideController.getSlides);
router.get('/getslides/:id', slideController.getSlideById);
router.post('/addslides', slideController.addSlide);
router.put('/updateslides/:id', slideController.updateSlide);
router.delete('/deleteslides/:id', slideController.deleteSlide);

module.exports = router;
