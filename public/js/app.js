const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (event) => {
    //to prevent default behaviour of browser which reloads page on form submision
    event.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //fetch is a js function for async http calls which is supported by all modern browsers
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.foreCast
            }
        })
    })

})