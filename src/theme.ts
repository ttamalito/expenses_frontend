import {createContext} from "react";
import { createTheme } from "@mui/material/styles";

// colors
const grey = '#666666';
const darkBlue = '#141b2d'; // primary
const greenAccent = '#4cceac';
const redAccent = '#db4f4a';
const violetAccent = '#6870fa';
const white = '#ffffff';

// export const tokens = (mode) => ({
//    ...(mode === 'dark' ? {grey})
// });

// mui theme settings
export const themeSettings = () => {
    return createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: darkBlue,
            },
            secondary: {
                main: greenAccent,
            },
            background: {
                default: darkBlue,
            },
            error: {
                main: redAccent,
            },
            warning: {
                main: violetAccent,
            },
            text: {
                primary: grey,
            },
        },
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: '40',
                color: white,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: '32',
                color: white,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: '24',
                color: white,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: '20',
                color: white,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: '16',
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: '14',
            }
        },
    });
}

export const theme = createTheme(themeSettings());

