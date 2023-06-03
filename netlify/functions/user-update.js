//import { env } from 'process'
//import {createClient} from '@sanity/client'

//console.log('process.env',env)

//const handler = async function (event) {
export async function handler (event, context, callback) {
  //const { identity, user } = context.clientContext;
  
  //console.log({event})
  //console.log({context})
  const user = event.body && JSON.parse(event.body) || null
  //console.log({user})

  /* AC fetch */
  const key = "import.meta.env.VITE_AC_API_KEY"
  const url = "import.meta.env.VITE_AC_API_URL + '/contacts?filters[email]=' + user.email"

  const options = {method: 'GET', headers: {accept: 'application/json'}}

  fetch(url, options)
    .then(response => response.json())
    .then(response => console.log({response}))
    .catch(err => console.error(err));


  //prep metadata for future tokens
  const netlifyResponseBody = {
    user_metadata: {
      ...user?.user_metadata || null,
      ...user?.app_metadata || null,
      email: user?.email,
      user_other_thing: 'some user value',
      another: 'another user value',
    },
  }

  console.log({netlifyResponseBody})

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(netlifyResponseBody),
  }
}

//module.exports = { handler }