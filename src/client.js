// import sanityClient from '@sanity/client';
// import imageUrlBuilder from '@sanity/image-url';

// export const client = sanityClient({
//     projectId: 'REACT_APP_SANITY_PROJECT_ID',
//     dataset: 'production',
//     apiVersion: '2021-11-16',
//     useCdn: true,
//     token: 'REACT_APP_SANITY_TOKEN',
// });

// const builder = imageUrlBuilder(client);

// export const urlFor = (source) => builder.image(source);



// src/client.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Create the Sanity client
const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID, // Use environment variable
  dataset: 'production',         
  apiVersion: '2023-01-01',      
  useCdn: true,                  
  token: process.env.REACT_APP_SANITY_TOKEN, // Use environment variable
});

// Function to generate image URLs
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

// Export the client as default
export default client;
