import { parseISO, format } from "date-fns";
import { client } from './sanityClient.js';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

export function formatBlogPostDate ( date ) {
  if (!date) return ''
  const dateString = parseISO( date, "YYYY/MM/Do" );
  const formattedDateString = format( dateString, "MMMM do, yyyy" );
  return `${ formattedDateString }`;
}

export function getSanityImageUrl(source) {
  return source ? builder.image(source) : false;
}
