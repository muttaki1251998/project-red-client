import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_BACKEND_API_URL,
  headers: {
    'x-frontend-id': 'project-red',
  },
});

// Admin login action creator
export const adminLogin = createAsyncThunk('admin/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/admin/login', { email, password });
    const token = response.data.token;
    localStorage.setItem('adminToken', token); // Store admin token in localStorage

    return { admin: response.data.admin, token }; // Return admin and token
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Admin logout action creator
export const adminLogout = createAsyncThunk('admin/logout', async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem('adminToken'); // Remove admin token from localStorage
    return true;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Initial state for the admin slice
const initialState = {
  admin: null,
  token: null, // Store the JWT token here
  status: 'idle',
  error: null,
  isAdminLoggedIn: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.admin = action.payload.admin;
        state.token = action.payload.token; // Store the token in the state
        state.isAdminLoggedIn = true;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAdminLoggedIn = false;
      })
      .addCase(adminLogout.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.admin = null;
        state.token = null; // Clear the token from the state
        state.isAdminLoggedIn = false;
      })
      .addCase(adminLogout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
