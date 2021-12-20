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
  },
  components: {
    ScrollView: {
      baseStyle: {
        backgroundColor: 'background',
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
    Lato: {
      normal: {
        normal: 'Lato-Regular',
        italic: 'Lato-Italic',
      },
      bold: {
        normal: 'Lato-Bold',
        italic: 'Lato-BoldItalic',
      },
      100: {
        normal: 'Lato-Thin',
        italic: 'Lato-ThinItalic',
      },
      200: {
        normal: 'Lato-Light',
        italic: 'Lato-LightItalic',
      },
      300: {
        normal: 'Lato-Light',
        italic: 'Lato-LightItalic',
      },
      400: {
        normal: 'Lato-Regular',
        italic: 'Lato-Italic',
      },
      500: {
        normal: 'Lato-Regular',
        italic: 'Lato-Italic',
      },
      600: {
        normal: 'Lato-Regular',
        italic: 'Lato-Italic',
      },
      700: {
        normal: 'Lato-Bold',
        italic: 'Lato-BoldItalic',
      },
      800: {
        normal: 'Lato-Bold',
        italic: 'Lato-BoldItalic',
      },
      900: {
        normal: 'Lato-Black',
        italic: 'Lato-BlackItalic',
      },
    },
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