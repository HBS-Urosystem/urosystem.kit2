import { client } from '/src/lib/sanityClient.js'
import { allEvents } from '/src/lib/api.js'
console.log('JSON.JS')
export async function get() {
  const data = await client.fetch(allEvents);

  if (data) {
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