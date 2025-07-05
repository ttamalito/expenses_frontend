export const constants = {
  Home: 'Home',
  Content: 'Content',
  aboutUs: 'AboutUs',
  Login: 'Login',
  Register: 'Register',
  Statistics: 'Statistics',
  Budget: 'Budget',
  Profile: 'Profile',
};

export const routes = {
  home: {
    index: `/`,
  },
  content: {
    home: `/${constants.Content}/${constants.Home}`,
    statistics: `/${constants.Content}/${constants.Statistics}`,
    budget: `/${constants.Content}/${constants.Budget}`,
    profile: `/${constants.Content}/${constants.Profile}`,
  },
  login: {
    index: `/${constants.Login}`,
  },
  register: {
    index: `/${constants.Register}`,
  },
};
