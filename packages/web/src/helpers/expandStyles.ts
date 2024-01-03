import { isWeb } from '@tamagui/constants'

import { normalizeShadow } from './normalizeShadow'

export function fixStyles(style: Record<string, any>) {
  if (process.env.TAMAGUI_TARGET === 'native') {
    if ('elevationAndroid' in style) {
      // @ts-ignore
      style['elevation'] = style.elevationAndroid
      // @ts-ignore
      delete style.elevationAndroid
    }
  }

  if (
    style.shadowRadius ||
    style.shadowColor ||
    style.shadowOpacity ||
    style.shadowOffset
  ) {
    Object.assign(style, normalizeShadow(style))
  }

  // TODO could be native-only
  // ensure border style set by default to solid
  for (const key in borderDefaults) {
    if (key in style) {
      style[borderDefaults[key]] ||= 'solid'
    }
  }
}

// native doesn't support specific border edge style
const nativeStyle = isWeb ? null : 'borderStyle'
const borderDefaults = {
  borderWidth: 'borderStyle',
  borderBottomWidth: nativeStyle || 'borderBottomStyle',
  borderTopWidth: nativeStyle || 'borderTopStyle',
  borderLeftWidth: nativeStyle || 'borderLeftStyle',
  borderRightWidth: nativeStyle || 'borderRightStyle',
}
