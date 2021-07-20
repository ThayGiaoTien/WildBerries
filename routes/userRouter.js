const router= require('express').Router()
const userCtrl= require('../controllers/userCtrl')
const auth= require('../middleware/auth')
const authAdmin= require('../middleware/authAdmin')

router.post('/register',userCtrl.register)
router.post('/login', userCtrl.login)
router.post('/logout', userCtrl.logout)
router.post('/refresh_token', userCtrl.refreshToken)
router.get('/user/:id',auth,  userCtrl.getUser)
router.get('/history',auth, userCtrl.history)
router.patch('/addCart', auth, userCtrl.addCart)

module.exports= router