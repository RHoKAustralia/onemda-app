export function decodeJwtPayload(jwt) {
  const parts = jwt.split(".");
  if (parts.length !== 3) {
    console.error("JWT token was invalid.")
    return "";
  }
  const decodedPayload = window.atob(parts[1]);
  return JSON.parse(decodedPayload);
}

export function getUserRoles(jwt) {
  const payload = decodeJwtPayload(jwt);
  return payload.roles;
}
