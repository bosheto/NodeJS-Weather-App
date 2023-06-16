const request = require('postman-request')
const keys = require('./keys')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=' + keys.mapboxApiKey + '&limit=1'
    request(url, {json: true}, (error, {body}) => {
        if(error){
            callback({message: 'Unable to connect ot geolocation service'}, undefined)
        }else if(body.features.length === 0){
            callback({message: 'No location with this name found'}, undefined)
        }else{
            const {center, place_name} = body.features[0]
            
            callback(undefined, {
                lat: center[1],
                long: center[0],
                place_name: place_name 
            })
        }
    })

}

module.exports = geocode