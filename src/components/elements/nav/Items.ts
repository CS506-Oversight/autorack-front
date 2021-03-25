import AppPaths from '../../../const/paths';

type NavItemEntry = {
  label: string,
  link: string,
}

export const navItems: Array<NavItemEntry> = [
  {
    label: 'Login',
    link: AppPaths.SIGN_IN,
  },
  {
    label: 'Sign Up',
    link: AppPaths.SIGN_UP,
  },
];
