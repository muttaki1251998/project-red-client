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
    localStorage.setItem('adminToken', response.data.token); // Store admin token
    return response.data.admin;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Admin logout action creator
export const adminLogout = createAsyncThunk('admin/logout', async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem('adminToken'); // Remove admin token
    return true;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Initial state for the admin slice
const initialState = {
  admin: null,
  status: 'idle',
  error: null,
  isAdminLoggedIn: false, // Default to false, update in useEffect
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminLoggedIn(state, action) {
      state.isAdminLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.admin = action.payload;
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
        state.isAdminLoggedIn = false;
      })
      .addCase(adminLogout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setAdminLoggedIn } = adminSlice.actions;

export default adminSlice.reducer;
