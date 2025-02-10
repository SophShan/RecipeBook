import { extendTheme } from "@chakra-ui/theme-utils";

const theme = extendTheme({
  config: {
    initialColorMode: "system", // "light" | "dark" | "system"
    useSystemColorMode: true,
  },
});

export default theme;
