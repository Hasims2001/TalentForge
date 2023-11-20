import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";

export const Theme = extendTheme(
  {
    semanticTokens: {
        colors: {
          error: 'red.500',
          text: {
            default: 'gray.900',
            _dark: 'gray.50',
          },
        },
      },
    colors: {
      brand: {
        100: "#1a365d",
        200: "#153e75",
        300: "#2a69ac",
      },
    },
    fonts: {
      heading: `Work Sans, ${base.fonts.heading}`,
      body: `Work Sans, ${base.fonts.body}`,
    },
    components: {
    
    },
  },
  withDefaultColorScheme({
    colorScheme: "brand",
  }),
//   withDefaultVariant({
//     variant: "filled",
//     components: ["Input", "Select", "Textarea"],
//   })
);

export default Theme;
