import { cookies } from '$lib/stores'

/* AC fetch */
const key = import.meta.env.VITE_AC_API_KEY
const url = import.meta.env.VITE_AC_API_URL + '/contacts?filters[email]=lukacs.vertes@urosystem.com'// + user.email

const options = {
  method: 'GET', 
  headers: {
    accept: 'application/json',
    'Api-Token': key
  }
}

/*export async function load({ getSession }) {
  const cookies = await getSession()
  console.log({cookies})
  $cookies = cookies?.session || false
  cookies.set('session', $cookies, { path: '/' });

  return {
    $cookies
  };
}*/

/** @type {import('./$types').PageServerLoad} */
export async function load({ event, params, fetch, getSession }) {
  //console.log({event})
  //console.log({params})
  //console.log('C',cookies.serialize())

  //const user = event?.body && JSON.parse(event.body) || null
  //console.log({user})
  //let user
  const cookies = await getSession//()
  console.log({cookies})
  //$cookies = cookies?.session || false
  //cookies.set('session', $cookies, { path: '/' });



  await fetch(url, options)
    .then(async response => {
      const data = await response.json()
      //console.log(data.contacts[0])
      //user = response.body
      //console.log({user})

      //prep metadata for future tokens
      /*const netlifyResponseBody = {
        ...user,
        user_metadata: {
          ...user?.user_metadata || null,
          ...user?.app_metadata || null,
          email: user?.email,
          user_other_meta: 'some user value',
          another: 'another user value',
        },
      }*/

      //console.log({netlifyResponseBody})

      return {
        //session: cookies.get('session'), // You can also use your old `getSession` function if you wish.
        user: 'response.json(),', //post: await db.getPost(params.slug)
        //ac_user: user,
        //cookies: $cookies,
      }
    })
    .catch(err => console.error(err))
}