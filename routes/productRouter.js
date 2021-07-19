const router= require('express').Router()
const auth= require('../middleware/auth')
const authAdmin= require('../middleware/authAdmin')

const productCtrl= require('../controllers/productCtrl')

router.post('/product', auth, authAdmin, productCtrl.createProduct)
router.get('/products', productCtrl.getProducts)

module.exports= router