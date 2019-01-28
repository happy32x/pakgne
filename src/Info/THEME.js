const TYPE_THEME = {
  NORMAL: 'NORMAL',
  WHITE: 'WHITE',
  DARK: 'DARK',
}

const ALL_THEME = {
  NORMAL: {
    PRIMARY: {
      COLOR: '#FFFFFF',
      BACKGROUND_COLOR: '#F57F17',
      WAVE_COLOR_WHITE: '#FFC79F',
      WAVE_COLOR_PRIMARY: '#FFB677',
    },
    SECONDARY: {
      COLOR: '#000000',
      BACKGROUND_COLOR: 'transparent',
      WAVE_COLOR: '#5E5E5E',
    },
    TERTIARY: {
      COLOR: '#A7A7A7',
      BACKGROUND_COLOR: 'transparent',
      WAVE_COLOR: '#D4D4D4',
      SEPARATOR_COLOR: '#EDEDED',
    },
    STATUS_BAR: {
      DEFAULT_COLOR: '#E17000',
      SOME_VIEW_COLOR: '',
      TRANSPARENT: 'transparent',
    },
    ON_LOAD_COLOR: '#DDDDDD',
  },
  WHITE: {},
  DARK: {},
}

const TYPE = 'NORMAL'

const THEME =
  TYPE === TYPE_THEME.NORMAL ? ALL_THEME.NORMAL
    : TYPE === TYPE_THEME.WHITE ? ALL_THEME.WHITE
      : TYPE === TYPE_THEME.DARK ? ALL_THEME.DARK 
        : ALL_THEME.NORMAL
        

export default THEME

