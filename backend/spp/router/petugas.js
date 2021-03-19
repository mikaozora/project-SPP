const express = require("express")
const app = express()
const petugas = require("../models/index").petugas
const md5 = require("md5")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BAYARSPPBOSS"
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const auth = require("../auth")

app.get("/", auth, async(req, res) => {
    petugas.findAll()
    .then(result => {
        res.json({
            data : result
        })
    })
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})

app.get("/:id", auth, async(req, res) => {
    let param = {
        id_petugas : req.params.id
    }
    petugas.findOne({where:param})
    .then(result => {
        res.json({
            data : result
        })
    })
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})

app.post("/", async(req, res) => {
    let data = {
        username : req.body.username,
        password : md5(req.body.password),
        nama_petugas : req.body.nama_petugas,
        level : req.body.level
    }
    petugas.create(data)
    .then(result => {
        res.json({
            message : "data berhasil ditambahkan",
            data : result
        })
    })
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})

app.put("/", async(req, res) => {
    let param = {
        id_petugas : req.body.id_petugas
    }
    let data = {
        username : req.body.username,
        password : md5(req.body.password),
        nama_petugas : req.body.nama_petugas,
        level : req.body.level
    }
    petugas.update(data, {where:param})
    .then(result => {
        res.json({
            message : "data berhasil diupdate"
        })
    })
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})

app.delete("/:id",auth, async(req, res) => {
    let param = {
        id_petugas : req.params.id
    }
    petugas.destroy({where:param})
    .then(result => {
        res.json({
            message : "data berhasil dihapus"
        })
    })
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})
app.post("/admin", async (req,res) => {
    let param = {
        username: req.body.username,
        password: md5(req.body.password),
        level : 'admin'
    }

    let result = await petugas.findOne({where: param})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false, 
            message: "Invalid username or password"
        })
    }
})
app.post("/petugas", async (req,res) => {
    let param = {
        username: req.body.username,
        password: md5(req.body.password),
        level: 'petugas'
    }

    let result = await petugas.findOne({where: param})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false, 
            message: "Invalid username or password"
        })
    }
})
module.exports = app