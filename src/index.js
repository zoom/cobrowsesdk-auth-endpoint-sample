import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { KJUR } from 'jsrsasign'
import { inNumberArray, isBetween, isLengthLessThan, isRequired, validateRequest } from './validations.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 4000

app.use(express.json(), cors())
app.options('*', cors())

// Validations should match Zoom Cobrowse SDK's documentation:
// https://developers.zoom.us/docs/cobrowse-sdk/auth/#payload
const validator = {
  role: [isRequired, inNumberArray([1, 2])],
  userId: isLengthLessThan(35),
  userName: isLengthLessThan(35),
  expirationSeconds: isBetween(1800, 172800)
}

const coerceRequestBody = (body) => ({
  ...body,
  ...['role', 'expirationSeconds'].reduce(
    (acc, cur) => ({ ...acc, [cur]: typeof body[cur] === 'string' ? parseInt(body[cur]) : body[cur] }),
    {}
  )
})

app.post('/', (req, res) => {
  const requestBody = coerceRequestBody(req.body)
  const validationErrors = validateRequest(requestBody, validator)

  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors })
  }

  const { role, expirationSeconds, userId, userName } = requestBody

  const iat = Math.floor(Date.now() / 1000)
  const user_id = userId ?? Math.random().toString(36).substring(2)
  const user_name = userName ?? user_id
  const exp = expirationSeconds ? iat + expirationSeconds : iat + 60 * 60 * 2
  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    app_key: process.env.ZOOM_SDK_KEY,
    role_type: role,
    user_id,
    user_name,
    iat,
    exp
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_SDK_SECRET)
  return res.json({ token: sdkJWT })
})

app.listen(port, () => console.log(`Zoom Cobrowse SDK Auth Endpoint Sample Node.js, listening on port ${port}!`))
