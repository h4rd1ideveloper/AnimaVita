/* eslint @typescript-eslint/no-empty-interface: "off" */

import 'styled-components'
import {StandardProperties} from 'csstype'
import theme from './theme'

export type Theme = typeof theme
const a = StandardProperties
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {

  }
}
