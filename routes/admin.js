// Importando express
const express = require('express')
// Necessário para criar rotas em outros arquivos
const router = express.Router()
// Importando o models criado
const mongoose = require('mongoose')
require('../models/categoria')
const Categoria = mongoose.model('categorias')



// Rotas
    router.get('/', (req, res) => {
        res.render('admin/index')
    })

    router.get('/posts', (req, res) => {
        res.send('Página de posts')
    })

    router.get('/categorias', (req, res) => {
        res.render('admin/categorias')
    })

    router.get('/categorias/add', (req, res) => {
        res.render('admin/addcategorias')
    })

    router.post('/categoria/nova', (req, res) => {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }

        new Categoria(novaCategoria).save().then(() => {
            console.log('Categoria Salva')
        }).catch((err) => {
            console.log('Erro ao salvar')
        })
    })



module.exports = router
