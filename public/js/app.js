const loading_text = 'Loading...'

let temp_unit = 'C'
let humidity_unit = '%'
let wind_speed_unit = 'km/h'
let precip_unit = 'mm'
let visibility_unit = 'km'

const weather_form = document.querySelector('form')
const search = document.querySelector('input')
const error_p = document.getElementById('errorText')

const current_temp = document.getElementById('currentTemp')
const feels_like_temp = document.getElementById('feelsLikeTemp')
const humidity = document.getElementById('humidityValue')
const weather_condition = document.getElementById('weatherCondition')
const precip = document.getElementById('precipitation')
const visibility = document.getElementById('visibility')
const wind_speed = document.getElementById('windSpeed')
const location_name = document.getElementById('location-name')

weather_form.addEventListener('submit', (e) => {
    e.preventDefault()
    current_temp.textContent = loading_text
    feels_like_temp.textContent = loading_text
    humidity.textContent = loading_text
    weather_condition.textContent = loading_text
    precip.textContent = loading_text
    visibility.textContent = loading_text
    wind_speed.textContent = loading_text
    location_name.textContent = loading_text

    error_p.textContent = ''
    fetch('/weather?address='+search.value).then((response) =>{
        response.json().then((data) => {
            if(data.error){
                error_p.textContent = data.error
            }else{
                location_name.textContent = data.location
                current_temp.textContent = data.current_temp + temp_unit
                feels_like_temp.textContent = data.feels_like_temp + temp_unit
                humidity.textContent = data.humidity + humidity_unit
                wind_speed.textContent = data.wind_speed + wind_speed_unit
                precip.textContent = data.precip + precip_unit
                visibility.textContent = data.visibility + visibility_unit
                weather_condition.textContent = data.description

                error_p.textContent = ''
            }
        })
    })

})

