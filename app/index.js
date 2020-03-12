const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const reqpromise = require('request-promise')

const app = express()
const port = 3000

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/app', (req, res) => {
  const airportOptions = {
    method: 'GET',
    uri: 'http://127.0.0.1:5002/weatherman/airports',
    json: true
  }

  reqpromise(airportOptions)
    .then((data) => {
      res.render('airports', {airportData: data})
      console.log('success')
    })
    .catch((err) => {
      // Something bad happened, handle the error
      console.log(err)
    })
})




app.get('/app/:flyFrom', (req, res) => {

  const cityOptions = {
    method: 'GET',
    uri: 'http://127.0.0.1:5002/weatherman/sunnycities',
    //uri: 'http://127.0.0.1:5002/wman/sunnycities',
    json: true
  }
  
  const flightOptions = {
    method: 'GET',
    uri: 'http://127.0.0.1:5002/weatherman/sunnyflights/' + req.params.flyFrom,
    //uri: 'http://127.0.0.1:5002/wman/sunnyflights/' + req.params.flyFrom,
    json: true
  }

  Promise.all([
    reqpromise(cityOptions),
    reqpromise(flightOptions)
  ])
  .then((Response) => {
    res.render('interactive', {cityData: Response[0], flightData: Response[1]})
  })  
  .catch((err) => {
    // Something bad happened, handle the error
    console.log(err)
    reject()
  })
  
})

app.use(express.static('static'))
