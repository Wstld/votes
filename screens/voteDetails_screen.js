import React, {useState} from 'react';
import { Text, View, StyleSheet, useWindowDimensions, Button, Modal, CheckBox, Pressable,FlatList,SafeAreaView} from 'react-native';
import { batch, useDispatch, useSelector } from 'react-redux';
import VoteResult from '../components/voteResult'
import store from '../redux/store';
import { Sepparator } from '../components/sepparator';
import { detailsSlice,userChoice } from '../redux/features/detailsSlice';
import { loginSlice } from '../redux/features/loginSlice';
import { useEffect } from 'react';

const VoteDetails = ({ navigaton, route }) => {
  let dispatch = useDispatch()
  const { height, width } = useWindowDimensions();
  const id = route.params.voteId;
  let userId = store.getState().login.user.uid;


  let data = useSelector(state => state.details.voteData.filter(e=> e.id === id)[0]);
  let hasUserVoted = data.voters[userId] ? data.voters[userId].voted : false;

  const modalOpen = useSelector(state => state.details.modalOpen);

  const styles = StyleSheet.create({
    mainCont: {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',

    },
    descpCont: {
      backgroundColor: 'rgba(243, 242, 209, 1)',
      width: width - 30,
      padding: 10,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius: 10,
      marginBottom: 10,

    },
    title: {
      fontSize: 20,
      marginBottom: 10,
      marginTop: 15,
    },
    sumTxt: {
      backgroundColor: 'rgba(243, 242, 209, 1)',
      width: 50,
      height:50,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius: 10,
      marginBottom: 10,
      marginTop: 15,
      textAlign:'center',
      textAlignVertical:'center',
      fontSize:15,

    },
    modal:{
     

    },
    modalCont:{
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor:'white',
      width:width,
      height:height - 100,
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
    },
    modalHeader:{
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      height:70,
      backgroundColor:'rgba(243, 242, 209, 1)',
      textAlign:'center',
      textAlignVertical:'center',
      fontSize:20,
    },
    modalBtn:{
      height:30,
      backgroundColor:'orange',
      alignItems:'center',
      width:100,
    },
    listCont:{
      alignSelf:'center',
      marginTop:20,
    }
  })
  

  function makeChoice(pick){
    batch(() => {
      dispatch(userChoice( {choice:pick,voteId:id, uid:userId}));
      dispatch(detailsSlice.actions.toggelModal());
    })
    
  }


  const OptBtn = ({item,index}) => {
    console.log("item",item)
    return(
      <Pressable style={styles.modalBtn} onPress={() => {makeChoice(item)}}>
        <Text>{item}</Text>
      </Pressable>
    )
  }
  
  //should have error handling for id/Db missmatch. 
  //create modal on vote tap.
  console.log("voted", Object.values(data.voters).filter( e => e.voted).length      )
  return (
    <SafeAreaView style={styles.mainCont}>
       <Modal
          animationType="slide"
          transparent={true}
          visible={modalOpen}
          style={styles.modal}
        >
        <SafeAreaView  style={styles.modalCont}>
        <Text style={styles.modalHeader}>{data.title}</Text>
        <FlatList
                    data={data.options}
                    renderItem={OptBtn}
                    ItemSeparatorComponent={(() => (<Sepparator height = {8}/>))}
                    contentContainerStyle={styles.contentCotainerStyle}
                    style={styles.listCont}
                />
        <Pressable style={styles.modalBtn} onPress={() => {dispatch(detailsSlice.actions.toggelModal())}}>
         <Text>Close</Text>
        </Pressable>
        </SafeAreaView>
        
        </Modal>


      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.descpCont}>
        <Text>{data.description}</Text>
      </View>
      <VoteResult options= {data.options} results = {data.result} total = {Object.keys(data.voters).length} />
      <Text style={styles.sumTxt}>{`${Object.values(data.voters).filter( e => e.voted).length}/${Object.keys(data.voters).length}`}</Text>
      <Button title="Vote" disabled={hasUserVoted} onPress={() => {dispatch(detailsSlice.actions.toggelModal())}}/>
    </SafeAreaView>

  );
}

export default VoteDetails;