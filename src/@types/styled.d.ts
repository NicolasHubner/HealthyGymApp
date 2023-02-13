import 'styled-components';

import { lightTheme as theme } from '@/styles/theme';

declare module 'styled-components' {
    type ThemeType = typeof theme;

    export interface DefaultTheme extends ThemeType {}
}
