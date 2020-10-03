const express = require('express')
const router =express.Router()

const AuthController =require('../controllers/AuthController')
const ModuleController=require('../controllers/ModuleController')
const authe=require('../middlewares/auth')


//login+registre
router.post('/registre',AuthController.registre)
router.post('/login',AuthController.login)

//creat and edit module 
router.post('/edit/:id/:idModule',ModuleController.update_module)
router.post('/create/:id',ModuleController.create)
//delete module 
router.delete('/delete/:id/:idModule',ModuleController.delete_module)
//get user's modules
router.get('/myModules/:id',ModuleController.getMyModules)
//get all modules
router.get('/modules',ModuleController.getAllModules)

module.exports=router


