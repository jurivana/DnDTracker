import { extendTheme } from 'native-base';

const Theme = extendTheme({
  colors: {
    primary: {
      50: '#e6f5ff',
      100: '#ccdce5',
      200: '#b1c4cd',
      300: '#93abb7',
      400: '#7794a1',
      500: '#5e7a88',
      600: '#475f6b',
      700: '#31444d',
      800: '#192a30',
      900: '#001115',
    },
    background: '#0e0e0e',
    gold: {
      500: '#ffe34b',
      600: '#ffdb1a',
    },
    silver: {
      500: '#dcd8d9',
      600: '#bfbfbf',
    },
    copper: {
      500: '#cd8a4b',
      600: '#b47032',
    },
  },
  components: {
    ScrollView: {
      baseStyle: {
        bg: 'background',
      },
    },
    Box: {
      baseStyle: {
        bg: 'background',
      },
    },
    Text: {
      baseStyle: {
        color: 'lightText',
      },
    },
  },
  config: {
    initialColorMode: 'dark',
  },
  fontConfig: {
    Sora: {
      normal: {
        normal: 'Sora-Regular',
      },
      bold: {
        normal: 'Sora-Bold',
      },
      100: {
        normal: 'Sora-Thin',
      },
      200: {
        normal: 'Sora-ExtraLight',
      },
      300: {
        normal: 'Sora-Light',
      },
      400: {
        normal: 'Sora-Regular',
      },
      500: {
        normal: 'Sora-Medium',
      },
      600: {
        normal: 'Sora-SemiBold',
      },
      700: {
        normal: 'Sora-Bold',
      },
      800: {
        normal: 'Sora-ExtraBold',
      },
    },
  },
  fonts: {
    heading: 'Sora',
    body: 'Sora',
    mono: 'Sora',
  },
});
type CustomThemeType = typeof Theme;
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
export { Theme };
