import sanityClient from '@sanity/client';

const config = {
  projectId: import.meta.env.VITE_PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_PUBLIC_SANITY_DATASET,
  token: import.meta.env.VITE_PUBLIC_SANITY_READ_TOKEN,
  apiVersion: import.meta.env.VITE_PUBLIC_SANITY_API_VERSION,
  useCdn: true,
}
//console.log({config})

export const client = sanityClient(config);
