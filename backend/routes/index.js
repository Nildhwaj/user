const router = require('express').Router();
const User = require('../model/userModel');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../public/images')
    },
    filename: function(req, file, cb){
        var ext = file.mimetype.split('/');
        cb(null, "Profile" + Date.now() + '.'+ext[1] )
    }
});
const upload = multer({
    storage: storage
});

// const upload = multer({
//     dest: '../public/images'
// })
router.route('/').get((req, res) => {
    User.find()
    .then(records => res.status(200).json(records))
    .catch(err => res.status(404).json(err))
})

router.post('/add', upload.single('image'),(req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const image = req.file.filename;

    const newUser = new User({
        firstName, lastName, email, mobile, image
    });

    newUser.save()
        .then((user) => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json('User Deleted'))
        .catch(err => res.status(400).json(err));
});

router.post('/update/:id', upload.single('image'), (req, res) => {
    console.log("Image Record", req);
    const data = {};
    data.firstName = req.body.firstName;
    data.lastName = req.body.lastName;
    data.email = req.body.email;
    data.mobile = req.body.mobile;
    data.image = req.file ? req.file.filename : req.body.image ;
    User.findByIdAndUpdate(req.params.id, data)
        .then(() => {
            res.status(200).json('User Updated')
        })
        .catch(err => res.status(400).json(err));
})

module.exports = router