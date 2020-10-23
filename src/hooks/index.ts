import {Dispatch, SetStateAction, useEffect, useState} from 'react'
let window = require("global/window")
type Response<T> = [
  T,
  Dispatch<SetStateAction<T>>
]

export function usePersistedState<T>(key: string, initialState: T): Response<T> {
  function initialize(): T {
    if(window?.localStorage){
      const storageValue = window.localStorage.getItem(key)
      if(storageValue)
        return  JSON.parse(storageValue)
    }
    return initialState
  }
  const [state, setState] = useState<T>(initialize)
  useEffect(() => {
    window?.localStorage && window.localStorage.setItem(key, JSON.stringify(state))
  }, [state, setState])

  return [state, setState]
}
