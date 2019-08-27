const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const foreCast = require('./utils/foreCast')

//__dirname refers to current directory
//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

//set up handlebars engine
//hbs (handlebars npm module) is a templatin engine used to bind dynamic content
//using mustache templates and by default express pulls them from views folder
app.set('view engine', 'hbs')

//set up views location
//if u do not want to use default views directory u can always 
//set the views directory path using below
app.set('views', viewsPath)

//configuring handlebars to use partials
hbs.registerPartials(partialsPath)

//To serve static content from public directory
app.use(express.static(publicDirectoryPath))

//no need to provide extension, the file name is enough to pick it from views folder
//express then populates the template with actual value and renders it as html
//render method takes 2 args, 1->view name and 2->and object with the values to be
//rendered in the vire template
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather HBS',
        name: 'Ayush'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpMessage: 'This is a help message',
        name: 'Ayush'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ayush'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'Please provide an adress.'
        })
    }
    //assigning default values if the geocode is successful but data is not returned
    //e.g if address='!'
    geoCode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        foreCast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                foreCast: foreCastData,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Ayush'
    })
})
//if no url mathes the one we set above
//it should always be the last route entry
app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        errorMessage: 'Page not found.',
        name: 'Ayush'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000..')
})