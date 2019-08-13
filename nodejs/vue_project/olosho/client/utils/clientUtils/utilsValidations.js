/* eslint-disable no-useless-escape */
const validateField = (field) => {
  if (field.trim() !== '' || field.trim().length > 1) {
    return true
  }
  return false
}
const validateUsername = (field) => {
  if (validateField(field)) {
    return true // here we regex the value
  }
  return false
}
const validatePassword = (field) => {
  if (validateField(field)) {
    return true
  }
  return false
}
const validatePhone = (field) => {
  if (validateField(field)) {
    return true
  }
  return false
}
const validateEmail = (field) => {
  if (validateField(field)) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(field)
  }
  return false
}
const validateEthnicSelection = (field) => {
  if (validateField(field)) {
    return true
  }
  return false
}
const validateOrientationSelection = (field) => {
  if (validateField(field)) {
    return true
  }
  return false
}
const validateBio = (field) => {
  if (validateField(field)) {
    return true
  }
  return false
}

export {
  validateField,
  validateUsername,
  validatePassword,
  validatePhone,
  validateEmail,
  validateEthnicSelection,
  validateOrientationSelection,
  validateBio
}
