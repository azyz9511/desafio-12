const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectMongo = require('connect-mongo');

const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true};
router.use(session({
  store: connectMongo.create({
    mongoUrl: 'mongodb+srv://juandavid:azyz9510@cluster0.33nzl.mongodb.net/sessions?retryWrites=true&w=majority',
    mongoOptions: advancedOptions,
    ttl: 60
  }),
  secret: 'secreto',
  resave: true,
  saveUninitialized: true
}));

router.get('/',(req, res) => {
    if(req.session.nombre == undefined){
        res.render('pages/login')
    }else{
        res.render('pages/index',{nombre: req.session.nombre})
    }
});

router.post('/', (req, res) => {
    if(req.session.nombre == undefined){
        req.session.nombre = req.body.nombre;
    }
    res.render('pages/index',{nombre: req.session.nombre})
  })

router.get('/logout',(req, res) => {
    if(req.session.nombre == undefined){
        res.render('pages/login');
    }
    const nombre = req.session.nombre;
    req.session.destroy((error) => {
        if(!error){
            res.render('pages/logOut',{nombre});
        }else{
            res.send({status: 'logout error'});
        } 
    });

});

module.exports = router;