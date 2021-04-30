import AppPaths from './paths';

/**
 * Const values of the app.
 */
export default class AppValues {
  // Restock Purchases
  static TAX_RATE = 0.07;

  // Data expiry
  static DATA_EXPIRY_MS = 300000;

  // Redirection
  static TARGET_AFTER_SIGN_UP = AppPaths.RESTOCK_PURCHASES;
  static TARGET_AUTHED_ON_ANONYMOUS = AppPaths.RESTOCK_PURCHASES;
}
