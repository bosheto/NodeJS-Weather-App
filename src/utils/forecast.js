const request = require('postman-request')
const keys = require('./keys')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.WS_API_KEY + '&query='+ encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '&units=m'
    request(url, {json: true}, (error, {body} = {}) => {
        if(error){
            callback({message: 'Unable to connect to weather service'}, undefined)
        }else if(body.error){
            callback({message: body.error.info}, undefined)
        }else{
            const current_data = body.current
            callback(undefined, {
                current_temperature: current_data.temperature,
                feels_like: current_data.feelslike,
                description: current_data.weather_descriptions
            })
        }
    })
}

module.exports = forecast