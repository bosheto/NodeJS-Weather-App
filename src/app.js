const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const PORT = process.env.PORT | 3000

// Paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
// Handlebars paths
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location (templates)
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//Set up handlebars partials path
hbs.registerPartials(partialsPath)

// Set up public folder for html
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Boris Gezkovski'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Boris Gezkovski',
        img: '/img/9124_2.png'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Boris Gezkovski',
        message: 'Help page message'
    })
})


app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "No address provided"
        })
    }

    geocode(req.query.address, (error, {lat, long, place_name} = {}) => {
        if(error){
            return res.send({
                error: error.message
            })
        }
        forecast(lat,long, (error, data) => {
            if(error){
                return res.send({
                    error: error.message
                })
            }
            res.send({
                location: place_name,
                current_temp: data.current_temperature,
                feels_like_temp: data.feels_like,
                description: data.description[0],
                humidity: data.humidity,
                precip: data.precip,
                wind_speed: data.wind_speed,
                visibility: data.visibility
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Boris Gezkovski',
        error_message: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Boris Gezkovski',
        error_message: 'Page not found'
    })
})

// Start web server
app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT)
})

/*
    add toggle for units 
    make icon depend on weather condition
    make spinning loading animation
    fix error message
    choose a naming convention and follow it
*/