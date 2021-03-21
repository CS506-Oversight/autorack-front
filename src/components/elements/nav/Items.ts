import AppPaths from '../../../const/paths';


type NavItemEntry = {
  id: number,
  label: string,
  link: string,
}


export const navBarItems: Array<NavItemEntry> = [
  {
    id: 0,
    label: 'Login',
    link: AppPaths.SIGN_IN,
  },
  {
    id: 1,
    label: 'Sign Up',
    link: AppPaths.SIGN_UP,
  },
  {
    id: 2,
    label: 'Sign Out',
    link: AppPaths.SIGN_OUT,
  },
];
