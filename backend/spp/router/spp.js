const express = require("express")
const app = express()
const spp = require("../models/index").spp
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/", async(req, res) => {
    spp.findAll()
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

app.get("/:id", async(req, res) => {
    let param = {
        id_spp : req.params.id
    }
    spp.findOne({where:param})
    .then(result => {
        res.json({
            data: result
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
        tahun : req.body.tahun,
        nominal : req.body.nominal
    }
    spp.create(data)
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
        id_spp : req.body.id_spp
    }
    let data = {
        tahun : req.body.tahun,
        nominal : req.body.nominal
    }
    spp.update(data, {where:param})
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

app.delete("/:id", async(req, res) => {
    let param = {
        id_spp : req.params.id
    }
    spp.destroy({where:param})
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
module.exports = app