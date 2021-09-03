import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firestore from '@react-native-firebase/firestore';
import { STATUS } from '../../util/constants'


export const userChoice = createAsyncThunk(
    'setUserChoice',
    async (payload, thunkAPI) => {
        console.log(payload)
        let ref = firestore().collection("votes").doc(payload.voteId);
        let response = await firestore().runTransaction(async transaction => {
            const voteSnap = await transaction.get(ref)
          console.log("data",voteSnap.data())
            
          transaction.update(ref,{
                [`result.${payload.choice}`] : voteSnap.data().result[payload.choice] + 1,
            })

            transaction.update(ref, {
                [`voters.${payload.uid}.voted`] : true,
            })
        })
        
    }

);

export const getVoteData = createAsyncThunk(
    'getVoteData', async (payload, thunkAPI) => {
        let response = await firestore().collection('votes').where(firestore.FieldPath.documentId(), 'in', payload).get();
        return response;
    }
);


export const detailsSlice = createSlice({
    name: 'details',
    initialState: {
        modalOpen: false,
        voteData: [],
        status: STATUS.loading
    },
    reducers: {
        toggelModal: (state, action) => {
            state.modalOpen = !state.modalOpen;
        },
        setVoteData: (state,action) => {
            state.voteData = action.payload;
        }
    },
    extraReducers: {
        [userChoice.pending]: (state, action) => {
            console.log("working on change")
        },
        [userChoice.fulfilled]: (state, action) => {
            console.log("Changed it")
        },
        [userChoice.rejected]: (state, action) => {
            console.log(action)
        },
        [getVoteData.pending]: (state, action) => {
            state.status = STATUS.loading
        },
        [getVoteData.rejected]: (state, action) => {
            console.log(action)
            state.voteData = []
            state.status = STATUS.idle
        },
        [getVoteData.fulfilled]: (state, action) => {
            let voteList = []
            action.payload.forEach((e) => voteList.push(e.data()));
            state.voteData = voteList;
        }
    }
})

export const { toggelModal } = detailsSlice.actions;

export default detailsSlice.reducer;
