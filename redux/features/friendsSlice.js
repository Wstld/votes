import { createSlice, createAsyncThunk, freeze } from "@reduxjs/toolkit";
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth'
import { STATUS } from '../../util/constants'
import store from "../store";

export const addFriend = createAsyncThunk(
    'addFriend',
    async (payload, thunkAPI) => {
        console.log(payload.friend)
        const response = await firestore().collection('users').doc(payload.uid).update({
            [`friends.${payload.friend.id}`]:payload.friend
        })
        return response
    }
)

export const searchFriend = createAsyncThunk(
    'searchFriends',
    async (payload, thunkAPI) => {
      let response = await firestore()
       .collection('users')
       .where('name','>=',payload)
       .where('name','<=',payload + '\uf8ff')
       .get();
        
       return response;
    }

);
export const removeFriend = createAsyncThunk(
    'removeFriends',
    async (payload, thunkAPI) => {
        let docRef = firestore().collection('users').doc(payload.uid);
        let response = await docRef.update({friends:payload.friends});
        return response;
    }

    

);




export const friendsSlice = createSlice({
    name: 'friends',
    initialState: {
        searchResult: [],
    },
    reducers: {
        
    },
    extraReducers: {
        [searchFriend.pending]: (state, action) => {
            console.log("working on change")
        },
        [searchFriend.fulfilled]: (state, action) => {
            let resArr = []
            if (action.payload.empty){
                return
            }
            action.payload.docs.forEach(e => resArr.push(e.data()));
            state.searchResult = resArr;
            console.log("Search done")
        },
        [searchFriend.rejected]: (state, action) => {
            console.log(action)
        },
        [removeFriend.pending]: (state, action) => {
            console.log("working on change")
        },
        [removeFriend.fulfilled]: (state, action) => {
            console.log("removed")
        },
        [removeFriend.rejected]: (state, action) => {
            console.log(action)
        },
        [addFriend.pending]: (state, action) => {
            console.log("working on change")
        },
        [addFriend.fulfilled]: (state, action) => {
            console.log("added")
        },
        [addFriend.rejected]: (state, action) => {
            console.log(action)
        },
    }
})

export const {  } = friendsSlice.actions;

export default friendsSlice.reducer;
