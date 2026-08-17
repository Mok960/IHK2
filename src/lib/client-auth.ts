export const ADMIN_USER = "Mok960";
export const ADMIN_PASSWORD = "12345678";
export const ADMIN_TOKEN = "Mok960-ok";
export const AUTH_STORAGE_KEY = "aurora_admin";
export const AUTH_COOKIE = "aurora_admin";

export function credentialsAreValid(username: string, password: string) {
  return username.trim() === ADMIN_USER && password === ADMIN_PASSWORD;
}

export function persistLogin() {
  localStorage.setItem(AUTH_STORAGE_KEY, ADMIN_TOKEN);
  document.cookie = `${AUTH_COOKIE}=${ADMIN_TOKEN}; Path=/; Max-Age=1209600; SameSite=Lax`;
}

export function clearLogin() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  document.cookie = `${AUTH_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function isClientLoggedIn() {
  if (typeof window === "undefined") {
    return false;
  }
  return localStorage.getItem(AUTH_STORAGE_KEY) === ADMIN_TOKEN;
}

export function getAdminToken() {
  if (typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(AUTH_STORAGE_KEY) === ADMIN_TOKEN ? ADMIN_TOKEN : "";
}
