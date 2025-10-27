import axios from "axios";
import { getToken } from "../utils/auth"; // ✅ correct path

const API_URL = "http://localhost:5000/api";

export const loginUser = async (data) => {
  const res = await axios.post(`${API_URL}/auth/login`, data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(`${API_URL}/auth/register`, data);
  return res.data;
};

export const getAssignments = async () => {
  const token = getToken();
  const res = await axios.get(`${API_URL}/assignments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
