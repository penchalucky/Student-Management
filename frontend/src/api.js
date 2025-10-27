import axios from "axios";
import { getToken } from "./auth";

// ✅ Backend base URL
const API_BASE_URL = "http://localhost:5000/api";

// ✅ REGISTER USER
export const registerUser = async (userData) => {
  const res = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return res.data;
};

// ✅ LOGIN USER
export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
  return res.data;
};

export const getAssignments = async () => {
  const res = await axios.get(`${API_BASE_URL}/assignments`);
  return res.data;
};

export const createAssignment = async (assignment) => {
  const res = await axios.post(`${API_BASE_URL}/assignments`, assignment);
  return res.data;
};

export const confirmSubmission = async (assignmentId) => {
  const res = await axios.post(`${API_BASE_URL}/submissions/confirm`, { assignmentId });
  return res.data;
};

