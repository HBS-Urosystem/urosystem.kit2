import { env } from 'process'
import {createClient} from '@sanity/client'

console.log('process.env',env)

//const handler = async function (event) {
export async function handler (event, context, callback) {
  //const { identity, user } = context.clientContext;
  
  //console.log({client})
  console.log({event})
  console.log({context})
  const data = JSON.parse(event.body)
  const { user } = data
  console.log({user})

  //prep metadata for future tokens
  const netlifyResponseBody = {
    user_metadata: {
      ...user.user_metadata,
      //user_other_thing: 'some user value'
    },
  }

}

//module.exports = { handler }