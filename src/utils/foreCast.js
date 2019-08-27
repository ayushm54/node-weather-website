const request = require('request')

forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4527c05909d322279ae7562e3d0b7e0d/' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + "It is currently " + body.currently.temperature + " degrees out there." +
                "There is a " + body.currently.precipProbability + "% chance of rain.")
        }
    })
}

module.exports = forecast