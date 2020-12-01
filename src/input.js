const inputField = document.getElementById('input-field')
const input = document.getElementById('input')

input.addEventListener('focus', () => inputField.classList.add('active'))
input.addEventListener('focusout', () => inputField.classList.remove('active'))