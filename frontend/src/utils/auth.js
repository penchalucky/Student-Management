export const setToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const setUserRole = (role) => localStorage.setItem("userRole", role);
export const getUserRole = () => localStorage.getItem("userRole");
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
};
