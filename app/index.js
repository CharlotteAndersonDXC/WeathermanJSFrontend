const request = require('request-promise')



function pullCitiesFromAPI(){
    const options = {
      method: 'GET',
      uri: 'http://127.0.0.1:5002/weatherman/sunnycities',
      json: true
    }
    request(options)
      .then(function (response) {
        
        console.log(response)
        // Request was successful, use the response object at will
        console.log('hello from Node.js, this time with the cities from the webserver')

      })
      .catch(function (err) {
        // Something bad happened, handle the error
        console.log('Node.js says poop off')
      })
    }


function pullFlightsFromAPI(){
  const options = {
    method: 'GET',
    uri: 'http://127.0.0.1:5002/weatherman/sunnyflights',
    json: true
  }
  request(options)
    .then(function (response) {
      
      console.log(response)
      // Request was successful, use the response object at will
      console.log('hello from Node.js, this time with the flights from the wbeserver')

    })
    .catch(function (err) {
      // Something bad happened, handle the error
      console.log('Node.js says poop off')
    })
  }
