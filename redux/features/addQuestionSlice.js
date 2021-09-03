import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth'
import { STATUS } from '../../util/constants'


export const setQuestion = createAsyncThunk(
    'setQuestion', async (payload, thunkAPI) => {
        let addedFriends = Object.keys(payload.voters);
        console.log(addedFriends)
        let response = await firestore().collection('votes').doc(payload.id).set(payload).then( async () => {
            const snap = await firestore().collection('users').get();
            const batch = firestore().batch();

           snap.forEach((doc) => {
               console.log(doc.data().id)
            if (addedFriends.some( (e) => e === doc.data().id)){
                batch.update(doc.ref,{
                    voteFlags: firebase.firestore.FieldValue.arrayUnion(payload.id),
                });
            }
        })
         return batch.commit();
        }
        
        );
    }
);


export const addQuestionSlice = createSlice({
    name: 'addQuestion',
    initialState: {
        typedOption:'',
        userFriends:[],
        friendsModalOpen: false,
        optionsModalOpen: false,
        title: '',
        description:'',
        addedFriends:[],
        options:[],
        status: STATUS.idle,

    },
    reducers: {
        toggelFriendsModal: (state, action) => {
            state.friendsModalOpen = !state.friendsModalOpen;
        },
        toggelOptionsModal: (state, action) => {
            state.optionsModalOpen = !state.optionsModalOpen;
        },
        setUserFriends: (state, action) => {
            state.userFriends = action.payload;
        },
        updateClicked: (state, action) => {
            console.log( state.userFriends[action.payload].clicked )
            state.userFriends = state.userFriends.map((item,index) => {
              if (index !== action.payload){
                  return item;
              }
              return { ...item,clicked:!item.clicked  };
            });
        },
        reset:(state,action) => {
            state.friendsModalOpen = false;
            state.optionsModalOpen = false;
            state.title = '';
            state.description = '';
            state.addedfriends = [];
            state.options = [];
            state.status = STATUS.idle;
        },
        addFriends: (state, action) => {
           let newArray = state.addedFriends.slice();
           newArray.push(action.payload);
           state.addedFriends = newArray;
        },
        typedOption: (state, action) => {
            state.typedOption = action.payload;
        },
        addOption: (state, action) => {
            let newArray = state.options.slice();
            newArray.push(action.payload);
            state.options = newArray;
        },
        deleteFriend:(state,action) => {
            
            let newArray = state.addedFriends.filter( item => action.payload.id !== item.id);
            state.addedFriends = newArray;
        },
        deleteOpt: (state,action) => {
            let newArray = state.options.filter(item => action.payload !== item);
            state.options = newArray;
        },
        setTitle:(state,action) => {
            state.title = action.payload;
        },
        setDesc:(state,action) => {
            state.description = action.payload;
        },

    },
    extraReducers: {
        [setQuestion.pending]:(state,action) =>{
            state.status = STATUS.loading;
        },
        [setQuestion.rejected]:(state,action) => {
            console.log("REJECTED",action);

        },
        [setQuestion.fulfilled]:(state,action) =>{
            state.status = STATUS.idle;
            state.addedFriends = [];
            state.title = null;
            state.description = null;
            state.options = [];
        },
    },
})

export const { toggelFriendsModal } = addQuestionSlice.actions;

export default addQuestionSlice.reducer;
