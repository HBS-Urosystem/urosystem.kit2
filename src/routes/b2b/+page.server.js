

/** @type {import('./$types').PageServerLoad} */
export async function load({ event, params, cookies, fetch }) {
  //console.log({event})
  //console.log({params})
  console.log(cookies.serialize())

  //const user = event?.body && JSON.parse(event.body) || null
  //console.log({user})
  let user

  /* AC fetch */
  const key = import.meta.env.VITE_AC_API_KEY
  const url = import.meta.env.VITE_AC_API_URL + '/contacts?filters[email]=lukacs.vertes@urosystem.com'// + user.email

  const options = {
    method: 'GET', 
    headers: {
      accept: 'application/json',
      'Api-Token': key
    }
  };

  fetch(url, options)
    .then(response => {
      response.json()
      //console.log({response})
      user = response.body
      //console.log(user)
    })
    .catch(err => console.error(err));


  //prep metadata for future tokens
  const netlifyResponseBody = {
    ...user,
    user_metadata: {
      ...user?.user_metadata || null,
      ...user?.app_metadata || null,
      email: user?.email,
      user_other_meta: 'some user value',
      another: 'another user value',
    },
  }

  //console.log({netlifyResponseBody})

  return {
    session: cookies.get('session'), // You can also use your old `getSession` function if you wish.
    user: netlifyResponseBody, //post: await db.getPost(params.slug)
    ac_user: user,
  };
}