/* eslint-disable camelcase,@typescript-eslint/explicit-module-boundary-types */
import { Anime } from '../types'
export interface partialDataInterface {
  animes: Anime[]
  links: {
    first: string
    next: string
    last: string
  }
  count: number
}
export const headers = {
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  }
}
export const animeParserFromServer = ({
  attributes: {
    image: { original: image_url },
    description,
    name,
    names: { ja_jp: name_jp }
  }
}): Anime => ({
  image_url,
  description,
  name,
  name_jp
})
export const animeParserFromState = ({
  animes,
  links,
  count
}): partialDataInterface => ({
  animes,
  links,
  count
})
