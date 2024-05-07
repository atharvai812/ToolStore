var express = require('express');
var router = express.Router();
const userModel = require('./users');
const toolModel = require('./tools');
const passport = require('passport');
const upload = require('./multer');


const localstrategy = require('passport-local');
// const { path } = require('../app');
passport.use(new localstrategy(userModel.authenticate()));

/* GET home page. */
router.get('/',isLoggedIn, async function (req, res, next) {
  const tools = await toolModel.find(); 
  res.render('index', { tools });
});

router.get('/search', async function (req, res, next) {
  const query = req.query.q; // Get the search query from the URL
  const tools = await toolModel.find({
    $or: [
      { toolname: { $regex: new RegExp(query, 'i') } },
      // { description: { $regex: new RegExp(query, 'i') } }
    ]
  });
  res.render('search', { tools, query });
});

router.get('/NewTool',isLoggedIn, function (req, res, next) {
  res.render('AddTool', { title: 'Express' });
});

router.get('/cateogery', async function (req, res, next) {
    const tools = await toolModel.find(); 
    res.render('cateogery', { tools }); 
});

router.get('/login', function (req, res, next) {
  console.log(req.flash('error'));
  res.render('Login', {error:req.flash('error')});
});

router.post('/upload',isLoggedIn, upload.single("file") , async function (req, res, next) {
  if (!req.file){
   return res.status(404).send("No file uploaded");
  }
   const user = await userModel.findOne({username:req.session.passport.user});
  const tool = await toolModel.create({
      toolname:req.body.toolname,
      description:req.body.description,
      category:req.body.category,
      image:req.file.filename,
      link:req.body.link,
      user:user._id
    })
    user.tools.push(tool._id);
    user.save();
    res.redirect('/');
  // res.send("File Uploaded");
});

router.get('/profile', isLoggedIn, async function (req, res , next) {
  const user = await userModel.findOne({
    username:req.session.passport.user
  })
  console.log(user);
  res.render('profile', {user});
});

router.post('/register', async function (req, res) {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/login");
      })
    })
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}), function (req, res) {
});


router.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

module.exports = router;
