

const weather_form = document.querySelector('form')
const search = document.querySelector('input')
const error_p = document.getElementById('errorText')
const weather_p = document.getElementById('weatherText')


weather_form.addEventListener('submit', (e) => {
    e.preventDefault()
    weather_p.textContent = 'Loading...'
    error_p.textContent = ''
    fetch('/weather?address='+search.value).then((response) =>{
        response.json().then((data) => {
            if(data.error){
                error_p.textContent = data.error
                weather_p.textContent = ''
            }else{
                weather_p.textContent = data.location + '\n' + data.weather.current_temperature + ' degrees'
                error_p.textContent = ''
            }
        })
    })

})

