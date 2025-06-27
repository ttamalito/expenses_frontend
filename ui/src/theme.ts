import { createTheme, Button, Switch } from '@mantine/core';

const theme = createTheme({
  colors: {
    violet: [
      '#f7ecff',
      '#e7d6fb',
      '#caaaf1',
      '#ac7ce8',
      '#9354e0',
      '#833bdb',
      '#7b2eda',
      '#6921c2',
      '#5d1cae',
      '#501599',
    ],
  },
  other: {
    beigeBackground: '#faf6ea',
    aqua: '#78cff8', // light blue to be used for almost all titles
    yoloPurple: '#503387', // the purple to be used throughout the app
    yoloButton: '#8c2c78', // the purple to be used for buttons
    yoloSwitch: '#4F3485', // used in switch components - darker shade of purple
    yoloTitle: '#3F9CDC',
    grayBackground: '#eee',
    grayBackgroundInput: '#e5e5e5', // used in left/right sections of inputs
    descriptorStatus: {
      pendingApproval: '#dfba49',
      active: '#503387', // the same as yoloPurple (Vigente)
      frozen: '#4DA8DA',
      hired: '#16e05d',
      todos: '#e31f09',
      warranty: '#1809e3',
    },
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        color: '#8c2c78',
      },
    }),
    Switch: Switch.extend({
      defaultProps: {
        size: 'lg',
        color: '#4F3485', // yoloSwitch
        styles: {
          trackLabel: {
            fontSize: 12,
          },
        },
      },
    }),
  },
});

export default theme;
