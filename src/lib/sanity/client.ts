//import { createClient } from "@sanity/client"
import sanityClient from '@sanity/client';

export const client = sanityClient({
   projectId: import.meta.env.VITE_PUBLIC_SANITY_PROJECT_ID,
   dataset: import.meta.env.VITE_PUBLIC_SANITY_DATASET,
   token: import.meta.env.VITE_PUBLIC_SANITY_READ_TOKEN,
   apiVersion: import.meta.env.VITE_PUBLIC_SANITY_API_VERSION,
   // Set to `true` for production environments
   useCdn: false, 
})