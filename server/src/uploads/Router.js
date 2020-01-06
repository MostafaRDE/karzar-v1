const {Router: Router} = require('express');
const router = Router();
const Uploads = require('./Controller');
const Storage = require('./../../util/multer/image-identity-storage');

router.get('/', Uploads.getFileReally);
router.get('/data', Uploads.getFile);
router.post('/upload', Storage.single('file'), Uploads.upload);

module.exports = router;
