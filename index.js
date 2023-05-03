const dayInput = document.getElementById('day')
const monthInput = document.getElementById('month')
const yearInput = document.getElementById('year')

const yearVal = document.getElementById('year-val')
const monthVal = document.getElementById('month-val')
const dayVal = document.getElementById('day-val')

const dayErrorText = document.getElementById('day-error')
const monthErrorText = document.getElementById('month-error')
const yearErrorText = document.getElementById('year-error')

const form = document.getElementById('form')

const labels = document.getElementsByClassName('label')
const errorTexts = document.getElementsByClassName('error-text')


const daysOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
let hasErrorP = false

const displayAge = (e) => {
    e.preventDefault()

    if(hasErrorP) {
        for(let label of labels) {
            label.classList.remove('red')
        }
        for(let errorText of errorTexts) {
            errorText.textContent = ''
        }
        dayInput.classList.remove('error')
        monthInput.classList.remove('error')
        yearInput.classList.remove('error')

        hasErrorP = false
    }

    if(dateIsValid()) {
        const date1 = new Date(`${yearInput.value}-${monthInput.value}-${dayInput.value}`)
        const date2 = new Date()
        const millisecs = date2 - date1
        const values = getData(millisecs)
        yearVal.textContent = values.year
        monthVal.textContent = values.month
        dayVal.textContent = values.day
    }
}

form.addEventListener('submit', displayAge)

const dateIsValid = () => {
    console.log(!dayInput.value)
    if(!dayInput.value && !monthInput.value && !yearInput.value) {
        hasErrorP = true
        for(let label of labels) {
            label.classList.add('red')
        }
        for(let errorText of errorTexts) {
            errorText.textContent = 'This field is required'
        }
        dayInput.classList.add('error')
        monthInput.classList.add('error')
        yearInput.classList.add('error')
        yearVal.textContent = '--'
        monthVal.textContent = '--'
        dayVal.textContent = '--'
        return false
    }
    let day = Number(dayInput.value)
    let month = Number(monthInput.value)
    let year = Number(yearInput.value)
    if ((day < 1 || day > 31) && (month < 1 || month > 12) && (year > new Date().getFullYear())) {
        hasErrorP = true
        for(let label of labels) {
            label.classList.add('red')
        }
        dayErrorText.textContent = 'Must be a valid day'
        monthErrorText.textContent = 'Must be a valid month'
        yearErrorText.textContent = 'Must be in the past'
        dayInput.classList.add('error')
        monthInput.classList.add('error')
        yearInput.classList.add('error')
        yearVal.textContent = '--'
        monthVal.textContent = '--'
        dayVal.textContent = '--'
        return false
    } else if((month >= 1 || month <= 12) && (day > daysOfMonths[month - 1])) {
        hasErrorP = true
        for(let label of labels) {
            label.classList.add('red')
        }
        dayErrorText.textContent = 'Must be a valid date'
        dayInput.classList.add('error')
        monthInput.classList.add('error')
        yearInput.classList.add('error')
        yearVal.textContent = '--'
        monthVal.textContent = '--'
        dayVal.textContent = '--'
        return false
    }

    if(new Date() < new Date(`${year}-${month}-${day}`)) {
        hasErrorP = true
        for(let label of labels) {
            label.classList.add('red')
        }
        dayErrorText.textContent = 'Enter a date before today'
        dayInput.classList.add('error')
        monthInput.classList.add('error')
        yearInput.classList.add('error')
        yearVal.textContent = '--'
        monthVal.textContent = '--'
        dayVal.textContent = '--'
        return false
    }
    return true
}

const getData = millisecs => {
    let month = 0
    const day = daysOfMonths.reduce((acc, val) => {
        if(acc > val) {
            month += 1
            acc = acc - val
            return acc
        } else {
            return acc
        }
    }, Math.floor((millisecs) % 31536000000 / 86400000))
    const year = Math.floor((millisecs)/31536000000)

    return {
        year,
        month,
        day
    }
}
