// ACTIONS
import { Dispatch } from 'redux'
import { animeParserFromServer, headers } from '../assets'
import { Anime } from '../types'

const actionTypes = {
  INIT: 'hydrate',
  LOADING: 'LOADING'
}
export const { INIT, LOADING } = actionTypes
export const isLoading = (flag: boolean) => (dispatch: Dispatch): void => {
  dispatch({ type: LOADING, flag })
}
export const hydrate = (url: string) => (dispatch: Dispatch): void => {
  fetch(url, headers)
    .then(response => response.json())
    .then(({ data, meta: { count }, links }) => {
      const animes: Anime[] = data.map(animeParserFromServer)
      dispatch({ type: INIT, animes, count, links })
    })
    .catch(console.log)
}
