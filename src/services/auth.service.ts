import { jwtDecode } from "jwt-decode";

export function getToken() {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return access_token;
  }
  return null;
}

export function storeToken(token: string) {
  localStorage.setItem("access_token", token);
}

export function removeToken() {
  localStorage.removeItem("access_token");
}

export function isTokenExpired(token: string) {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken?.exp) {
      return decodedToken?.exp < currentTime;
    }
    return true;
  } catch (error) {
    console.error("Invalid token:", error);
    return true;
  }
}

export function decodeToken(token: string) {
  if (!token) return {};
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken ;
  } catch (error) {
    console.error("Invalid token:", error);
    return {};
  }
}
