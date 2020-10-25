// ACTIONS
import { Dispatch } from 'redux'
import { charactersParserFromServer, charactersValid, headers } from '../assets'
import { characterInterface } from '../types'

const actionTypes = {
  INIT: 'hydrate',
  LOADING: 'LOADING'
}
export const { INIT, LOADING } = actionTypes
export const isLoading = (_isLoading: boolean) => (
  dispatch: Dispatch
): void => {
  dispatch({ type: LOADING, _isLoading })
}
export const hydrate = (url: string) => (dispatch: Dispatch): void => {
  isLoading(true)(dispatch)
  dispatch({ type: LOADING, _isLoading: true })
  fetch(url, headers)
    .then(response => response.json())
    .then(({ data, meta: { count }, links }) => {
      const characters: characterInterface[] = data
        .filter(charactersValid)
        .map(charactersParserFromServer)
      dispatch({ type: INIT, characters, count, links })
    })
    .catch(console.log)
  setTimeout(() => isLoading(false)(dispatch), 800)
}
