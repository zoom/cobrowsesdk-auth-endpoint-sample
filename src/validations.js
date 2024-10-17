import { isValidationError } from './utils.js'

/* CURRIED VALIDATORS */
export const inNumberArray = (allowedNumbers) => (property, value) => {
  if (typeof value === 'undefined') return

  if (typeof value !== 'number' || isNaN(value)) {
    return {
      property,
      reason: `Value ${value} not allowed, must be of type number`
    }
  }

  if (!allowedNumbers.includes(value)) {
    return {
      property,
      reason: `Value is not valid. Got ${value}, expected ${allowedNumbers}`
    }
  }
}

export const isBetween = (min, max) => (property, value) => {
  if (typeof value === 'undefined') return

  if (typeof value !== 'number' || isNaN(value)) {
    return {
      property,
      reason: `Value ${value} not allowed, must be of type number`
    }
  }

  if (value < min || value > max) {
    return {
      property,
      reason: `Value must in between ${min} and ${max}`
    }
  }
}

export const isLengthLessThan = (maxLength) => (property, value) => {
  if (typeof value === 'undefined') return

  if (typeof value !== 'string') {
    return {
      property,
      reason: `Value ${value} not allowed, must be of type string`
    }
  }

  if (value.length > maxLength) {
    return {
      property,
      reason: `Value exceed max length. Got ${value.length}, expected less than or equal to ${maxLength}`
    }
  }
}

export const isRequired = (property, value) => {
  if (typeof value === 'undefined') {
    return {
      property,
      reason: `Property required, but not present in request body`
    }
  }
}

/* VALIDATION RUNNER */
export const validateRequest = (body, validator) =>
  Object.keys(validator)
    .flatMap((property) => {
      const value = body?.[property]
      const func = validator[property]
      const validations = Array.isArray(func) ? func.map((f) => f(property, value)) : func?.(property, value)
      return Array.isArray(validations) ? validations : [validations]
    })
    .filter(isValidationError)
