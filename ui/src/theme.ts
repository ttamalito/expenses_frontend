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

export const tokens = () => (

    {
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414",
            },
            primary: {
                100: "#d0d1d5",
                200: "#a1a4ab",
                300: "#727681",
                400: "#1F2A40",
                500: "#141b2d",
                600: "#101624",
                700: "#0c101b",
                800: "#080b12",
                900: "#040509",
            },
            greenAccent: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922",
            },
            redAccent: {
                100: "#f8dcdb",
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#db4f4a",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f",
            },
            blueAccent: {
                100: "#e1e2fe",
                200: "#c3c6fd",
                300: "#a4a9fc",
                400: "#868dfb",
                500: "#6870fa",
                600: "#535ac8",
                700: "#3e4396",
                800: "#2a2d64",
                900: "#151632",
            },
    });
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

