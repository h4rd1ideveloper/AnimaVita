import { useMemo } from 'react'
import { Action, applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import thunkMiddleware from 'redux-thunk'
import { partialDataInterface } from '../assets'

import { INIT, LOADING } from './actions'

let store

export interface initialStateInterface extends partialDataInterface {
  _persist: any
  _isLoading: boolean
}

export const initialState: initialStateInterface = {
  _persist: null,
  _isLoading: true,
  characters: [],
  links: {
    first: '',
    next: '',
    last: ''
  }
}

// REDUCERS
interface ActionCustomProps extends Action {
  _isLoading?: boolean | null | undefined
}
export const reducer = (
  state = initialState,
  { type, ...payload }: ActionCustomProps
): initialStateInterface => {
  console.log(type, 'payload -', payload)
  switch (type) {
    case INIT:
      return {
        ...state,
        ...payload
      }
    case LOADING:
      return {
        ...state,
        _isLoading: Boolean(payload?._isLoading)
      }
    default:
      return state
  }
}

const persistConfig = {
  key: 'store',
  storage,
  blacklist: []
}
const persistedReducer = persistReducer(persistConfig, reducer)

function makeStore(_initialState = initialState) {
  return createStore(
    persistedReducer,
    _initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

export const initializeStore = (
  preloadedState: initialStateInterface
): Store => {
  let _store = store ?? makeStore(preloadedState)
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState
    })
    store = undefined
  }
  if (typeof window === 'undefined') return _store
  if (!store) store = _store
  return _store
}

export function useStore(initialState: initialStateInterface): Store {
  return useMemo(() => initializeStore(initialState), [initialState])
}
