const request = require('postman-request')
const fs = require('fs')


const file_path = 'data/weather.json'
const datetime = new Date()

const forecast = (lat, long, callback) => {
    try{
        const last_data = fs.readFileSync(file_path)
        last_data_json = JSON.parse(last_data)
        if(datetime.getHours() === last_data_json.timestamp || last_data_json.lat !== lat || last_data_json.long !== long){
            return callback(undefined, last_data_json)
        }
    }catch(e){
    }

    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.WS_API_KEY + '&query='+ encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '&units=m'
    request(url, {json: true}, (error, {body} = {}) => {
        if(error){
            callback({message: 'Unable to connect to weather service'}, undefined)
        }else if(body.error){
            callback({message: body.error.info}, undefined)
        }else{
            const current_data = body.current
            const data_obj = {
                current_temperature: current_data.temperature,
                feels_like: current_data.feelslike,
                description: current_data.weather_descriptions,
                humidity: current_data.humidity,
                wind_speed: current_data.wind_speed,
                precip: current_data.precip,
                visibility: current_data.visibility,
                timestamp: datetime.getHours(),
                lat: lat,
                long: long
            }
            const data_obj_str = JSON.stringify(data_obj)
            fs.writeFileSync(file_path, data_obj_str)
            callback(undefined, data_obj)
        }
    })
}

module.exports = forecast