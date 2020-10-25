/* eslint-disable camelcase,@typescript-eslint/explicit-module-boundary-types */
import { characterInterface } from '../types'

export interface partialDataInterface {
  characters: characterInterface[]
  links: {
    first?: string | null | undefined
    prev?: string | null | undefined
    next?: string | null | undefined
    last?: string | null | undefined
  }
}

export const headers = {
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  }
}
export const charactersValid = ({ attributes }) => {
  console.log(
    attributes,
    !!(
      attributes &&
      attributes?.description &&
      attributes?.name &&
      attributes?.names &&
      attributes?.names?.ja_jp &&
      attributes?.image &&
      attributes?.image?.original
    )
  )
  return !!(
    attributes &&
    attributes?.description &&
    attributes?.name &&
    attributes?.names &&
    attributes?.names?.ja_jp &&
    attributes?.image &&
    attributes?.image?.original
  )
}

export const charactersParserFromServer = ({
  attributes: {
    image: { original: image_url },
    description,
    name,
    names: { ja_jp: name_jp }
  }
}): characterInterface => ({
  image_url,
  description,
  name,
  name_jp
})
export const charactersParserFromState = ({
  characters,
  links
}): partialDataInterface => ({
  characters,
  links
})
