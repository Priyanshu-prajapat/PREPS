import { createTheme } from "@mui/material";

export const mainTheme = createTheme({
    palette: {
        primary: {
            main: "#696969",
            light: "#292929",
            dark: "#202020",
            contrastText: "#fff"
        }
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '.MuiOutlinedInput-notchedOutline': {
                        border: '3px solid #B3B3B3',
                        borderRadius: '6px'
                    },
                    '.MuiInputBase-input': {
                        paddingInline: '20px',
                        paddingBlock: '12px',
                        color: '#fff'
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: '#fff',
                    color: '#000',
                    ":hover": {
                        backgroundColor: "#FFFFFF40"
                    }
                },
                outlined: {
                    color: "#000",
                    borderColor: "#000",
                    ":hover": {
                        borderColor: "#000",
                        backgroundColor: '#FFFFFF54'
                    },
                }
            }
        }
    }
})