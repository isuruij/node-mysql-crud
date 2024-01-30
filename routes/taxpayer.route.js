const express = require('express')
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const router = express.Router()
const usermiddleware = require("../middleware/userauth")

const service = require('../services/taxpayer.service')

//http://localhost:3000/api/employees/
// router.get('/', async (req, res) => {
//     try {
//         const employees = await service.getAllEmployees()
//         res.send(employees)
//     } catch (error) {
//         res.send('Error : '+error.message)
//     }
// })

// router.get('/id', async (req, res) => {
//     try {
//         const employee = await service.getEmployeeById(req.body.id)
//         if (employee == undefined)
//             res.status(404).json('no record with given id : ' + req.body.id)
//         else
//             res.send(employee)
//     } catch (error) {
//         res.send('Error : '+error.message)
//     }
// })

// router.delete('/id', async (req, res) => {
//     try {
        
//         const affectedRows = await service.deleteEmployee(req.body.id)
//         if (affectedRows == 0)
//             res.status(404).json('no record with given id : ' + req.body.id)
//         else
//             res.send('deleted successfully.')
//     } catch (error) {
//         res.send('Error : '+error.message)
//     }
// })  

// router.post('/', async (req, res) => {
//     await service.addEmployee(req.body)
//     res.status(201).send('created successfully.')
// }) 

// router.put('/', async (req, res) => {
//     const affectedRows = await service.updateEmployee(req.body)
//     if (affectedRows == 0)
//         res.status(404).json('no record with given id : ' + req.body.id)
//     else
//         res.send('updated successfully.')
// })

// router.put('/:id', async (req, res) => {
//     const affectedRows = await service.addOrEditEmployee(req.body, req.params.id)
//     if (affectedRows == 0)
//         res.status(404).json('no record with given id : ' + req.params.id)
//     else
//         res.send('updated successfully.')
// })

router.post('/register',async (req,res)=>{
    try{

        await service.addTaxpayer(req.body)
        const data = req.body
        const token = jwt.sign({data},"key")
        res.cookie("token",token)
        res.json({Status:"Success",Data:data})
        // res.status(201).send('created successfully !.')
    }catch(error){
        res.json({Status:"Falied to register"})
    }
})

router.post('/login',async (req,res)=>{
    try{
        const data = await service.loginTaxpayer(req.body)
        const token = jwt.sign({data},"key")
        res.cookie("token",token)
        res.json({Status:"Success",Data:data})
        //res.status(201).send('created successfully !.')
    }catch(error){
        res.json({Status:"Falied to login"})
    }
})

router.get("/auth",usermiddleware.verifyuser, async (req, res) => {
    res.json({Status:"Success",Data:req.name})
});



module.exports = router;