const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//console.log(__dirname)      // C:\JavaScript\NodeJs\section-7\web-server-test\src
//console.log(__filename)     // C:\JavaScript\NodeJs\section-7\web-server-test\src\app.js

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static direcotry to serve
app.use(express.static(publicDirectoryPath))

// for url like localhost:3000
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead the Instructor'
    })
})

// for url like localhost:3000/index
app.get('/index', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead the Instructor'
    })
})

// for url like localhost:3000/about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead the Instructor'
    })
})

// for url like localhost:3000/help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrew Mead the Instructor'
    })
})

// for url like localhost:3000/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                Error: error
            })
        } 

        // console.log('latitude: ' + latitude + '   longitude: ' + longitude + '   location: ' + location)
        forecast(latitude, longitude, (error2, forcastData) => {
            if (error2) {
                return res.send({
                    Error: error2
                })
            }

            res.send({                      // send a object
                Location: location,
                latitude: latitude,
                longitude: longitude,
                Forcase: forcastData,
                Address: req.query.address
            })
        })
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead the Instructor',
        errorMessage: 'Help content not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead the Instructor',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
}) 