console.log('Client side javascript file is loaded!')

// To get over CORS issue
const proxy = 'https://cors-anywhere.herokuapp.com/'

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    if (location.trim() === '') {
        //return console.log('Please provide a location')
        messageOne.textContent = 'Please provide a location'
        messageTwo.textContent = ''
        return
    }

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoicmljaGFyZG1hcGJveCIsImEiOiJjazF6bDBxc3kwejYwM25tdXlkaWJhMjhvIn0.4pdfKCT5L9wdARE72eFiqg&limit=1'
    const darkskyUrl = 'https://api.darksky.net/forecast/20ed719622dd435cc3c123484e7f2639/'

    fetch(mapBoxUrl).then((response) => {
        response.json().then((mapData) => {
            if (mapData.error) {
                //console.log(mapData.error)
                messageOne.textContent = mapData.error
                messageTwo.textContent = ''
            } else if (mapData.features.length === 0) {
                // The location doesn't come back with latitude and/or longitude
                messageOne.textContent = 'Please provide a different location'
                messageTwo.textContent = ''
            } else {
                const latitude = mapData.features[0].center[0]         // Boston latitude = -71.0596
                const longitude = mapData.features[0].center[1]        // Boston longitude = 42.3605

                fetch(proxy + darkskyUrl + longitude + ',' + latitude + '?lang=zh').then((response) => {
                    response.json().then((forcastData) => {
                        if (forcastData.error) {
                            //console.log(forcastData.error)
                            messageOne.textContent = forcastData.error
                            messageTwo.textContent = ''            
                        } else {
                            //console.log('Here comes the forecast...')
                            //console.log(forcastData)
                            //console.log(mapData.features[0].place_name + " is currently " + forcastData.currently.summary + "   " + forcastData.daily.summary)
                            messageOne.innerHTML = 'Here comes the forecast'
                            messageTwo.innerHTML = mapData.features[0].place_name + " is currently " + forcastData.daily.summary
                        }
                    })
                })
            }
        })
    })    
})

/*
// this works, get over CORS issue with the proxy 
let address = 'san jose ca'
const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmljaGFyZG1hcGJveCIsImEiOiJjazF6bDBxc3kwejYwM25tdXlkaWJhMjhvIn0.4pdfKCT5L9wdARE72eFiqg&limit=1'

const darkskyUrl = 'https://api.darksky.net/forecast/20ed719622dd435cc3c123484e7f2639/'

fetch(mapBoxUrl).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            //console.log(data)
            console.log('latitude: ' + data.features[0].center[0])
            console.log('longitude: ' + data.features[0].center[1])
            console.log('location: ' + data.features[0].place_name)

            const latitude = data.features[0].center[0]         // Boston latitude = -71.0596
            const longitude = data.features[0].center[1]        // Boston longitude = 42.3605
            fetch(proxy + darkskyUrl + longitude + ',' + latitude + '?lang=zh').then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        console.log(data.error)
                    } else {
                        console.log('Here comes the forecast...')
                        //console.log(data)
                        console.log("It is currently " + data.currently.summary + "   " + data.daily.summary)
                    }
                })
            })
        }
    })
})
*/

/*
// this code is working
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data)
        }
    })
})
*/

/*
// this doesn't work, even with the proxy, can't get over CORS issue
fetch(proxy + 'http://localhost:3000/weather?address=boston').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
*/
