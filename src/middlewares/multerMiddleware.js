const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/img/users'))
    },
    filename: function(req, file, cb){
        let nombre = `${Date.now()}-${file.originalname}`
        cb(null, nombre)
    }
});

  const uploadFile = multer({
    storage:storage
})

module.exports = uploadFile;
