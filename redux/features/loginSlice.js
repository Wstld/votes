import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auth from '@react-native-firebase/auth'
import {STATUS} from '../../util/constants'


export const loginWithEmail = createAsyncThunk(
    'loginWithEmail',
    async (action, thunkAPI) => {
            let response = await auth().signInWithEmailAndPassword(action.username,action.password)
            return response;
    }
);

export const fbSignOut = createAsyncThunk(
    'signout',
    async (action,thunkAPI) => {
        let response = await auth().signOut();
        return response;
    }
);

export const createUserWithEmail = createAsyncThunk(
    'createUserWithEmail',
    async (action, thunkAPI) => {
       let response =  await auth().createUserWithEmailAndPassword(action.username,action.password);
       return response;
    }
);


export const loginSlice = createSlice({
    name:'login',
    initialState: {
        modalOpen: false,
        activeUser: false,
        user:null,
        userData:null,
        username:'',
        password:'',
        status:STATUS.idle,
    },
    reducers: {
        toggelModal: (state) => {
            state.modalOpen = !state.modalOpen;
            state.password = '';
        },
        setActiveUser: (state,action) => {
            state.activeUser = action.payload;
        },
        reSetUser: (state) => {
            state.userId = null;
        },
        setPassword: (state,action) => {
            state.password = action.payload;
        },
        setUsername: (state,action) => {
            state.username = action.payload;
        },
        setUserData: (state,action) => {
            state.userData = action.payload;
        },
        setUser: (state,action) => {
            state.user = action.payload;
        },
    },
    extraReducers: builder => {
        builder
        .addCase(loginWithEmail.pending, (state,action) => {
            state.status = STATUS.loading;
            console.log("pending");
        })
        .addCase(loginWithEmail.rejected, (state,action) => {
            state.status = STATUS.idle;
            console.log(action.error);
        })
        .addCase(loginWithEmail.fulfilled,(state,action) => {
            state.status = STATUS.idle;
            state.user = action.payload.user;
            console.log("user logged in")
        })
        .addCase(fbSignOut.pending, (state) => {
            state.status = STATUS.loading
        })
        .addCase(fbSignOut.rejected, (state,action) => {
            state.status = STATUS.idle;
            console.log(action.error);
        })
        .addCase(fbSignOut.fulfilled, (state) => {
            state.status = STATUS.idle;
            state.user = null;
            state.activeUser = false;
            state.userData = null;
            console.log("user logged out")
        })
        .addCase(createUserWithEmail.pending, (state) => {
            state.status = STATUS.loading;
        })
        .addCase(createUserWithEmail.rejected, (state,action) => {
            state.status = STATUS.idle;
            console.log("error from reducer")
            console.log(action.error);
        })
        .addCase(createUserWithEmail.fulfilled, (state,action) => {
            state.modalOpen = false;
            state.user = action.payload.user;
            console.log('user Created');
            state.activeUser = true;
        });
    },
});

export const { toggelModal, setActiveUser, setUserId, reSetUserId,setPassword,setUsername,setUserData,setUser } = loginSlice.actions;

export default loginSlice.reducer;


