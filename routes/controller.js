const MongoClient = require('mongodb');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage')
require("dotenv").config();


//I used an mlab Sandbox DB. Substitute the details with your own
const url = process.env.MONGO_URL;


let storage = new GridFsStorage({
    url: process.env.MONGO_URL,
    file: (req, file) => {
        return {
            bucketName: 'test',
            //Setting collection name, default name is fs      
            filename: file.originalname
            //Setting file name to original name of file    


        }
    }
});

let upload = null;
storage.on('connection', (db) => {
    //Setting up upload for a single file
    upload = multer({
        storage: storage
    }).single('file1');

});
module.exports.uploadFile = (req, res) => {
    upload(req, res, (err) => {


        if (err) {
            return res.render('index', { title: 'Uploaded Error', message: 'File could not be uploaded', error: err });
        } else {

            res.redirect('/profile/ ');
        }
    });
};