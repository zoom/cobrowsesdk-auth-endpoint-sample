export const isDefined = (str) => !!str

export const isStringArray = (value) => Array.isArray(value) && value.every((x) => typeof x === 'string')

export const isValidationError = (value) =>
  typeof value?.property !== 'undefined' && typeof value?.reason !== 'undefined'

export const replaceWhitespace = (str) => str.replace(/\s+/g, '')
