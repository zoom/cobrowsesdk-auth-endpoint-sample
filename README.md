# Zoom Cobrowse SDK Auth Endpoint sample

Use of this sample app is subject to our [Terms of Use](https://explore.zoom.us/en/video-sdk-terms/).
<!-- change url -->

This is a Node.js / Express server that generates a [Cobrowse SDK JWT](https://developers.zoom.us/docs/cobrowse-sdk/auth) via an HTTP request for authorized use of the [Zoom Cobrowse SDK](https://developers.zoom.us/docs/cobrowse-sdk/).

If you would like to skip these steps and just deploy the finished code to a managed service, click the Deploy to Railway/Render/Heroku button. (You will still need to configure a few simple things, so skip to [Deployment](#deployment).)

| Railway | Render | Heroku |
|:-:|:-:|:-:|
| [![Deploy on Railway](https://railway.com/button.svg)](https://railway.app/template/OjTGvs?referralCode=HTPdHX) | [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/zoom/cobrowsesdk-auth-endpoint-sample) | [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/zoom/cobrowsesdk-auth-endpoint-sample) | 
<!-- change url -->

> Note: Both Railway and Render have free tiers, but Heroku requires a credit card to deploy.

## Installation

In terminal, run the following command to clone the repository:

`$ git clone https://github.com/zoom/cobrowsesdk-auth-endpoint-sample.git`

## Setup

1. In terminal, `cd` into the cloned repository:

   `$ cd cobrowsesdk-auth-endpoint-sample`

2. Then install the dependencies:

   `$ npm install`

3. Rename `example.env` to `.env`, edit the file contents to include your Zoom SDK key and secret, save the file contents, and close the file:
<!-- change url -->

4. Start the server:

   `$ npm run start`

## Usage

Make a POST request to `http://localhost:4000` (or your deployed url) with the following request body:

| Property                 | Type     | Required? | Validation Rule(s)                                                    |
| ------------------------ | -------- | --------- | --------------------------------------------------------------------- |
| `role`                   | `number` | **Yes**   | - Required <br> - Must equal to `1` or `2`                            |
| `expirationSeconds`      | `number` | No        | - Must be between `1800` (30 minutes) and `172800` (48 hours) seconds |
| `userId`                 | `string` | No        | - Please ensure that the user ID is not repeated within a session     |
| `userName`               | `string` | No        |                                                                       |

> Note: `userId` is required to create a JWT, if not provided a random string will be used.

### Example Request

POST `http://localhost:4000`

Request Body:

```json
{
  "role": 1,
  "userId": "user123",
  "userName": "ekaansh"
}
```

If successful, the response body will be a JSON representation of your token:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfa2V5IjoiM2YzV0pkZ0FTZC0xN1VZTl9ZSmFQQSIsInJvbGVfdHlwZSI6MCwiaWF0IjoxNzI5MTU5MDkyLCJleHAiOjE3MjkxNjYyOTIsInVzZXJfaWQiOiJ1c2VyMTIzIn0.cVMgCnb5fJzhGr2nTowlYWojAdYiH2INMUhh5v2WTos"
}
```

In the Cobrowse SDK, for the **agent** you can pass in the `token` to the `ACCESS_TOKEN` in your iframe. 
<!-- change url -->

```html
<iframe src="<YOUR_URL>/desk?access_token=TOKEN>`>
```

For the **customer** you can pass in the `token` to the `sdkToken` in the `start` method of the session:  

```js
// Make http request to your auth endpoint to get the Cobrowse SDK JWT
ZoomCobrowseSDK.init(settings, function ({ success, session, error }) {
   ...
   session.start({
      sdkToken: token,
   });
})
```

## Deployment

### Deploy to a Managed Service

1. After clicking the "Deploy to <Provider\>" button, enter a name for your app (or leave it blank to have a name generated for you), and insert your Zoom SDK credentials:

   - `ZOOM_SDK_KEY` (Your Zoom  SDK Key, found on your Zoom SDK App's Credentials page)
   - `ZOOM_SDK_SECRET` (Your Zoom SDK Secret, found on your Zoom SDK App's Credentials page)

1. Then click "Deploy App".

1. Use your URL as your Cobrowse SDK Auth Endpoint.

   Example: `https://abc123.provider.com/`

```bash
$ curl <YOU_URL> -X POST -d '{  "role": "1",  "userId": "user123", "userName": "ekaansh"}' -H "Content-Type: application/json"
```

   
### Other Server Hosting

1. For Other Server Hosting information, see [this tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment#choosing_a_hosting_provider).

1. Use your deployed URL as your Cobrowse SDK Auth Endpoint.

   Example: `https://abc123.compute-1.amazonaws.com/`

Now you can [generate your Cobrowse SDK JWT](#usage).

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us)   or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://explore.zoom.us/docs/en-us/developer-support-plans.html) plans.
