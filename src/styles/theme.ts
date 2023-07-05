import { extendTheme } from 'native-base';

const colors = {
    text: {
        primary: '#2c2c2c',
    },

    background: {
        primary: '#f1f1f1',
    },

    blue: {
        300: '#8FACFF',
        400: '#2F80ED',
        500: '#E4DFFF',
    },

    blue_metal: {
        100: '#B7B7CC',
        300: '#9C9EB9',
        500: '#4C5980',
        700: '#2D3142',
    },

    green: {
        300: '#D7ECD8',
        500: '#90D692',
        600: '#51B655',
        700: '#589A5A',
        900: '#219653',
    },

    gray: {
        100: '#F4F6FA',
        200: '#F7F8F8',
        300: '#D6D9E0',
        350: '#BDBDBD',
        400: '#B7B7CC',
        450: '#EEEAEA',
        500: '#ADA4A5',
        600: '#828282',
        700: '#4F4F4F',
    },

    brown: {
        500: '#7B6F72',
    },
    red: {
        100: '#FF9B90',
        500: '#FF0000',
    },
    purple: {
        100: '#9B51E0',
    },
    yellow: {
        100: '#FFD666',
    },
    orange: {
        200: '#FFC2A1',
        500: '#FF8A00',
    },
};

export const nativeBaseTheme = extendTheme({
    fontConfig: {
        Rubik: {
            300: {
                normal: 'Rubik_400Regular',
            },
            400: {
                normal: 'Rubik_400Regular',
            },
            500: {
                normal: 'Rubik_500Medium',
            },
            600: {
                normal: 'Rubik_700Bold',
            },
            700: {
                normal: 'Rubik_700Bold',
            },
        },
    },
    fonts: {
        heading: 'Rubik',
        body: 'Rubik',
        mono: 'Rubik',
    },
    colors,
});

export const lightTheme = {
    font_family: {
        regular: 'Rubik_400Regular',
        medium: 'Rubik_500Medium',
        bold: 'Rubik_700Bold',
    },

    colors: {
        ...colors,
        text: '#2c2c2c',
        background: '#F1F1F1',
        white: '#ffffff',
        black: '#181818',
        beige: '#f2f2f2',
    },
};
