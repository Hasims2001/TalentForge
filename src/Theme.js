import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";


const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)"
};
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
        100: "#FFFFFF",
        110: "#e0e0e0",
        120: "#c2c2c2",
        130: "#8a8a8a",
        140: "#ededed",
        200: "#000000",
        300: "#ade8f4",
        500: "#00b4d8",
        600: "#0096c7",
        800: "#023e8a",
        900: "#03045e",
        910: "#19d600",
      },
    },
    fonts: {
      heading: `Work Sans, ${base.fonts.heading}`,
      body: `Work Sans, ${base.fonts.body}`,
    },
    components: {
      Form: {
        variants: {
          floating: {
            container: {
              _focusWithin: {
                label: {
                  ...activeLabelStyles
                }
              },
              // "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
              //   ...activeLabelStyles
              // },
              label: {
                top: 0,
                left: 0,
                zIndex: 2,
                position: "absolute",
                backgroundColor: "white",
                pointerEvents: "none",
                mx: 3,
                px: 1,
                my: 2,
                transformOrigin: "left top"
              }
            }
          }
        }
      }
    }
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
