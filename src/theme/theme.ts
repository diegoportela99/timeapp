import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

const styles = {
    global: (props: StyleFunctionProps) => ({
        body: {
            // sets a custom bg color for dark mode only
            bg: mode(
                // light mode value from theme
                props.theme.semanticTokens.colors['chakra-body-bg']._light,
                // value for dark mode
                'black',
            )(props),
        },
    }),
};

const components = {
    Drawer: {
        // setup light/dark mode component defaults
        baseStyle: (props: any) => ({
            dialog: {
                bg: mode('#edf2f7', '#141214')(props),
            },
        }),
    },
};

const theme = extendTheme({
    components,
    styles,
    initialColorMode: 'dark',
    colors: {
        bgDark: {
            900: "#141214"
            // 900: "#222222"
        },
        bgLight: {
            100: "#edf2f7"
            // 100: "#c9c9c9"
        },
        textDark: {
            900: "#edeced"
        },
        textLight: {
            100: "gray.800"
        }
    },
    shadows: {
        mainShadow: "0 0 8px 3px rgba(0,0,0,0.2)"
    }
});

export default theme;