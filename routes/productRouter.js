const router= require('express').Router()

const productCtrl= require('../controllers/productCtrl')

router.post('/product', productCtrl.createProduct)
router.get('/products', productCtrl.getProducts)

module.exports= router