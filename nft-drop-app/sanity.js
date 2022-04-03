import { createCurrentUserHook, createClient } from 'next-sanity'
// const sanityClient = require('@sanity/client')
import createImageUrBuilder from '@sanity/image-url'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  projectId: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token: 'sanity-auth-token', // or leave blank for unauthenticated usage
  useCdn: process.env.NODE_ENV === 'production', // `false` if you want to ensure fresh data
}

/**
 * set up helper function for generating Image URL with only asset reference in data
 *
 **/
export const sanityClient = createClient(config)

function urlFor(source) {
  return builder.image(source)
}
