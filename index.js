const bootstrap = require('bootstrap')

const colorPicker = document.querySelector("input")
let colorVal = (colorPicker.value).substring(1)

const schemePicker = document.getElementById('schemes')
let schemeVal = schemePicker.value

const randomColorBtn = document.querySelector(".random-btn")
const colorsContainer = document.querySelector(".color-schemes")
const footer = document.querySelector("footer")

// Updating colorVal when colorPicker is used
colorPicker.addEventListener('input', (e) => {
    colorVal = (e.target.value).substring(1)
    renderColors(colorVal, schemeVal)
})

// Updating the schemeVal when scheme is changed
schemePicker.addEventListener('input', (e) => {
    schemeVal = e.target.value
    renderColors(colorVal, schemeVal)
})

// Generating a random hex value
randomColorBtn.addEventListener('click', () => {
    const randomHexColor = (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
    colorPicker.value = `#${randomHexColor}`
    colorVal = randomHexColor
    renderColors(colorVal, schemeVal)
})

// Copy color bg value and convert from rgb to hex - source for rgb to hex conversion: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
document.querySelector('.color-schemes').addEventListener('click', (e) => {
    selectedColor = e.target.style["background-color"]
    const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
    columnColor = rgb2hex(selectedColor)
    navigator.clipboard.writeText(columnColor)
    document.querySelector('.toast-content').innerText = `${columnColor.toUpperCase()}: Copied`
    document.querySelector('.toast-body').style.border = `1px solid ${columnColor}`
    let toast = document.querySelector('.toast')
    toast = new bootstrap.Toast(toast)
    toast.show()
})


function renderColors() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorVal}&mode=${schemeVal}&count=5`)
        .then(res => res.json())
        .then(data => {
            colorsContainer.innerHTML = ""
            footer.innerHTML = ""
            data.colors.map(color => {
                colorsContainer.innerHTML += `<div class="color-column animate" style="background-color:${color.hex.value}"></div>`;
                footer.innerHTML += `
            <div class="hex-value"><p class="hex-text">${color.hex.value}</p></div>`
            })
        })
}


renderColors()