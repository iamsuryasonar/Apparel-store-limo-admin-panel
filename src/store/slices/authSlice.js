import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_NAME } from '../../common/constants';
import isValidToken from '../../common/authUtil'
import { setLoading } from './loadingSlice'
import { setMessage, clearMessage } from './messageSlice'
import AuthServices from '../../services/auth.services'

export const initialiseUser = createAsyncThunk(
    'auth/initialise',
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const accessToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))?.accessToken;
            const userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME))?.userData;

            if (!accessToken) {
                return thunkAPI.rejectWithValue("Access token not available");
            }
            if (!isValidToken(accessToken)) {
                return thunkAPI.rejectWithValue("Invalid token");
            }
            return { userData, accessToken };

        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        } finally {
            setTimeout(() => {
                thunkAPI.dispatch(clearMessage());
            }, 3000);
            thunkAPI.dispatch(setLoading(false));
        }
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async (creds, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const response = await AuthServices.register(creds);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        } finally {
            setTimeout(() => {
                thunkAPI.dispatch(clearMessage());
            }, 3000);
            thunkAPI.dispatch(setLoading(false));
        }
    }
)


export const login = createAsyncThunk(
    "auth/login",
    async (creds, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            const res = await AuthServices.login(creds);
            const data = {
                userData: {
                    name: res.name,
                    email: res.email,
                },
                accessToken: res.token,
            }
            localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(data));
            return data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        } finally {
            setTimeout(() => {
                thunkAPI.dispatch(clearMessage());
            }, 3000);
            thunkAPI.dispatch(setLoading(false));
        }
    }
);


export const logout = createAsyncThunk(
    "auth/logout",
    async (creds, thunkAPI) => {
        try {
            thunkAPI.dispatch(setLoading(true));
            AuthServices.logout();
            return;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        } finally {
            setTimeout(() => {
                thunkAPI.dispatch(clearMessage());
            }, 3000);
            thunkAPI.dispatch(setLoading(false));
        }
    }
);

const initialState = {
    userData: null,
    accessToken: null,
};

const aAuthSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers:
        (builder) => {
            builder
                .addCase(initialiseUser.fulfilled, (state, action) => {
                    state.userData = action.payload.userData;
                    state.accessToken = action.payload.accessToken;
                })
                .addCase(initialiseUser.rejected, (state, action) => {
                    state.userData = null;
                    state.accessToken = null;
                })
                .addCase(register.fulfilled, (state, action) => {
                })
                .addCase(register.rejected, (state, action) => {
                })
                .addCase(login.fulfilled, (state, action) => {
                    state.userData = action.payload.userData;
                    state.accessToken = action.payload.accessToken;
                }).addCase(login.rejected, (state, action) => {
                    state.userData = null;
                    state.accessToken = null;
                }).addCase(logout.fulfilled, (state, action) => {
                    state.userData = null;
                    state.accessToken = null;
                }).addCase(logout.rejected, (state, action) => {
                    state.userData = null;
                    state.accessToken = null;
                })
        }
});

const { reducer } = aAuthSlice;
export default reducer;