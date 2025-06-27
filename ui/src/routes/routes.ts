export const constants = {
  home: 'Home',
  content: 'Content',
  aboutUs: 'AboutUs',
  login: 'Login',
  register: 'Register',
  changeProfilePicture: 'ChangeProfilePicture',
  profile: 'Profile',
  error: 'Error',
};

export const routes = {
  home: {
    index: `/${constants.home}`,
    aboutUs: `/${constants.home}/${constants.aboutUs}`,
    login: `/${constants.home}/${constants.login}`,
    register: `/${constants.home}/${constants.register}`,
  },
  content: {
    index: `/${constants.content}`,
  },
  error: `/${constants.error}`,
};
