const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //const darkskyUrl = 'https://api.darksky.net/forecast/20ed719622dd435cc3c123484e7f2639/34.0544,-118.2439?lang=zh'
    const darkskyUrl = 'https://api.darksky.net/forecast/20ed719622dd435cc3c123484e7f2639/' + longitude + ',' + latitude + '?lang=zh'

    request({ url: darkskyUrl, json: true }, (error, response) => {
        if (error) {
            console.log(error)
            callback('Unable to connect to weather forecast service.', undefined)
        } else if (response.body.error) {
            console.log('response.body.currently=' + response.body.currently)
            callback('Unable to fine current forecast.', undefined)
        } else {
            console.log('Here comes the forecast...')
            //console.log(response.body)
            callback(undefined, "It is currently " + response.body.currently.summary + "   " + response.body.daily.summary)
        }
    })
}

module.exports = forecast