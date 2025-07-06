import {
  createTheme,
  Button,
  Switch,
  Text,
  Paper,
  Card,
  ActionIcon,
  Tabs,
  Anchor,
} from '@mantine/core';

// Define color palette based on requirements
const colors = {
  // Primary Colors
  darkGreen: '#1A4F37',
  emeraldGreen: '#28C76F',
  deepNavy: '#1E2A38',
  teal: '#00B8A9',

  // Accent Colors
  softGold: '#F6C453',
  skyBlue: '#4AA8D8',

  // Background / Neutral
  offWhite: '#F7F9FB',
  mediumGray: '#D3D8DE',
  charcoal: '#2C2E33',

  // Additional colors
  positive: '#28C76F', // Same as emeraldGreen for consistency
  negative: '#FF5C5C', // Red for negative values
  warning: '#F6C453', // Same as softGold for consistency
};

const theme = createTheme({
  // Set primary and default colors
  primaryColor: 'teal',

  // Define custom colors
  colors: {
    // Add custom teal color
    teal: [
      '#E6F7F6', // 0
      '#CCF0ED', // 1
      '#99E0DB', // 2
      '#66D1C9', // 3
      '#33C2B7', // 4
      '#00B8A9', // 5 - Main teal color
      '#009A8E', // 6
      '#007C72', // 7
      '#005E57', // 8
      '#00403B', // 9
    ],
    // Add custom dark green color
    darkGreen: [
      '#E8EEE9', // 0
      '#D1DDD3', // 1
      '#A3BBA7', // 2
      '#75997B', // 3
      '#47774F', // 4
      '#1A4F37', // 5 - Main dark green color
      '#16422E', // 6
      '#123524', // 7
      '#0D281B', // 8
      '#091A12', // 9
    ],
    // Add custom emerald color
    emerald: [
      '#E9F9F1', // 0
      '#D3F3E3', // 1
      '#A7E7C7', // 2
      '#7BDBAB', // 3
      '#4FCF8F', // 4
      '#28C76F', // 5 - Main emerald color
      '#21A65D', // 6
      '#1A854A', // 7
      '#146438', // 8
      '#0D4325', // 9
    ],
    // Add custom navy color
    navy: [
      '#E8EAED', // 0
      '#D1D5DB', // 1
      '#A3ABB7', // 2
      '#7581A3', // 3
      '#47576F', // 4
      '#1E2A38', // 5 - Main navy color
      '#19232F', // 6
      '#141C25', // 7
      '#0F151C', // 8
      '#0A0E12', // 9
    ],
  },

  // Set global styles
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',

  // Set default radius for components
  defaultRadius: 'md',

  // Set color scheme
  // colorScheme: 'light',

  // Set white and black colors
  white: colors.offWhite,
  black: colors.charcoal,

  // Component specific styles
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'teal',
        radius: 'md',
      },
      styles: () => {
        return {
          root: {
            fontWeight: 600,
          },
        };
      },
    }),

    Switch: Switch.extend({
      defaultProps: {
        size: 'lg',
        color: 'teal',
        styles: {
          trackLabel: {
            fontSize: 12,
          },
        },
      },
    }),

    Text: Text.extend({
      defaultProps: {
        color: colors.charcoal,
      },
    }),

    Paper: Paper.extend({
      defaultProps: {
        p: 'md',
        radius: 'md',
        withBorder: true,
        shadow: 'sm',
      },
      styles: () => {
        return {
          root: {
            backgroundColor: colors.offWhite,
          },
        };
      },
    }),

    Card: Card.extend({
      defaultProps: {
        p: 'lg',
        radius: 'md',
        withBorder: true,
        shadow: 'sm',
      },
      styles: () => {
        return {
          root: {
            backgroundColor: colors.offWhite,
          },
        };
      },
    }),

    ActionIcon: ActionIcon.extend({
      defaultProps: {
        color: 'teal',
        variant: 'subtle',
      },
    }),

    Tabs: Tabs.extend({
      defaultProps: {
        color: 'teal',
      },
    }),

    Anchor: Anchor.extend({
      defaultProps: {
        color: 'teal',
      },
    }),
  },
});

export default theme;
