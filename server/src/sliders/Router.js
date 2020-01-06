const {Router} = require('express');
const router = Router();
const Slider = require('./Controller');
const Storage = require('./../../util/multer/image-identity-storage');

router.get('/slider-items/:key', Storage.single('image'), Slider.sliderItems);

module.exports = router;
