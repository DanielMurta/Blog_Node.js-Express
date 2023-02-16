// Importando módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')


// Configurações
    // Session
        app.use(session({
            secret: 'cursonode',
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    
    // Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg')
            res.locals.success_msg = req.flash('success_msg')
            next()
        })

    // Body-Parser
        app.use(express.urlencoded({extended: true}))
        app.use(express.json())

    // Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')

    // Mongoose
        mongoose.Promise = global.Promise
        mongoose.connect('mongodb://127.0.0.1:27017/blogapp').then(() =>{
            console.log('Conectado ao mongo')
        }).catch((err) =>{
            console.log('Erro ao se conectar: ' + err)
        })

    // Public
        app.use(express.static(path.join(__dirname,'public')))

        app.use((req, res, next) => {
            console.log('Midddleware')
            next()
        })

// Rotas
    app.use('/admin', admin)

        
const PORT = 8081
app.listen(PORT, () => {
    console.log('Servidor Rodando')
})