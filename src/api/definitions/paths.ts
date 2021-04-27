/**
 * Paths of the backend API.
 */
export default class ApiPaths {
  private static API_URL = process.env.REACT_APP_API_ROOT;

  static ROOT = ApiPaths.API_URL + '/';

  static SIMPLE_ADD = ApiPaths.API_URL + '/add';

  static USER = ApiPaths.API_URL + '/user';

  static RESTOCK_PURCHASES = ApiPaths.API_URL + '/restock';

  static INGREDIENT = ApiPaths.API_URL + '/ingredient';

  static MENU = ApiPaths.API_URL + '/menu-item';
}
