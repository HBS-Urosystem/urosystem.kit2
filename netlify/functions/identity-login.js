import { env } from 'process'
import {createClient} from '@sanity/client'

//console.log('process.env',env)

//const handler = async function (event) {
export async function handler (event, context, callback) {
  //const { identity, user } = context.clientContext;
  
  //console.log({client})
  console.log({event})
  console.log({context})
  const data = event.body && JSON.parse(event.body)
  //const { user } = data
  const user = data?.user || null
  console.log({user})

  //prep metadata for future tokens
  const netlifyResponseBody = {
    user_metadata: {
      ...user?.user_metadata || null,
      //user_other_thing: 'some user value'
    },
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(netlifyResponseBody),
  }
}

//module.exports = { handler }