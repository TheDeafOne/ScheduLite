import { PaletteMode } from '@mui/material';
import { amber, blue, deepOrange, grey } from '@mui/material/colors';
export const getDesignTokens = (mode: PaletteMode) => ({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                //override the pseudo-classes
                '.Mui-disabled': {
                    opacity: .5,
                    background: 'green'
                },
                '.Mui-selected': { background: 'red' }
            }
        }
    },
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: blue,
                divider: amber[200],
                text: {
                    primary: grey[900],
                    secondary: grey[800],
                },
            }
            : {
                // palette values for dark mode
                primary: blue,
                divider: grey[700],
                background: {
                    default: grey[900],
                    paper: grey[900],
                },
                text: {
                    primary: '#fff',
                    secondary: grey[500],
                },
            }),
    },
});