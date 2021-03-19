const express = require("express")
const app = express()
const kelas = require("../models/index").kelas
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/", async(req, res) => {
    kelas.findAll()
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
        id_kelas : req.params.id
    }
    kelas.findOne({where:param})
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
        nama_kelas : req.body.nama_kelas,
        kompetensi_keahlian : req.body.kompetensi_keahlian
    }
    kelas.create(data)
    .then(result => {
        res.json({
            message: "data berhasil ditambahkan",
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
    let data = {
        nama_kelas : req.body.nama_kelas,
        kompetensi_keahlian : req.body.kompetensi_keahlian
    }
    let param = {
        id_kelas : req.body.id_kelas
    }
    kelas.update(data, {where:param})
    .then(result => {
        res.json({
            message : "data berhasil diupdate",
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
        id_kelas : req.params.id
    }
    kelas.destroy({where:param})
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