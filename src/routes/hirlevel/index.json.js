import { client } from '/src/lib/sanityClient.js'
import { hirlev } from '/src/lib/api.js'
//console.log('JSON.JS')
export async function get() {
  const data = await client.fetch(hirlev)
  console.log({data})
  if (data) {
    /*data.forEach(d => {
      d.body.map(block => {
        block.
      })
    });*/
    return {
      status: 200,
      body: data
      //}
    };
  }
  return {
    status: 500,
    body: new Error("Internal Server Error")
  };
}