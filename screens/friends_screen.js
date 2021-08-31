import React from 'react';
import { useEffect } from 'react';
import { Pressable, Text, TextInput, View,StyleSheet,FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Sepparator } from '../components/sepparator'
import { friendsSlice, removeFriend, searchFriend, addFriend} from '../redux/features/friendsSlice';
import store from '../redux/store';

const FriendsScreen = (navigator) => {
  
  let dispatch = useDispatch();
  let friends = useSelector(state => state.login.userData.friends)
  let friendsArr = Object.values(friends).map(e => e);
  
  let searchResult = useSelector(state => state.friends.searchResult);
  let filteredResults = !searchResult.length ? [] : searchResult.filter(e => !friendsArr.some(e2 => e.id === e2.id));
  
  
  function deleteFriend(friend){
   let newFriends = friendsArr.filter(e => e.id !== friend.id);
   let friendsObject = Object.assign({},...newFriends.map((e) => (
     {[e.id]:e}
   )))
   dispatch(removeFriend({uid:store.getState().login.user.uid, friends:friendsObject}))
 }

 function searchForFriend(friend){
   console.log(friend);
   if(friend.length > 3){
    dispatch(searchFriend(friend));
   }

 }

 function addClickedFriend(friend){
   let friendObj = {
     id:friend.id,
     email:friend.email,
     name:friend.name,
   };
   dispatch(addFriend({friend:friendObj,uid:store.getState().login.user.uid}));
 }

  const styles = StyleSheet.create({
    contentCotainerStyle:{
    },
    mainCont: {
      paddingTop:10,
    },
    listContainer: {
      maxHeight: 200,
      marginTop: 10,
      marginBottom:10,

    },
    mainContPlaceholder: {
      minHeight: 100,
      backgroundColor: 'white',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignSelf: 'center',
      width: '90%',
      borderRadius: 10,
      marginBottom:10,
      paddingTop:10,
    },
    textInput_small: {
      backgroundColor: 'orange',
      minHeight: 50,
      width:'90%',
      borderRadius: 10,
      paddingLeft: 20,
    },
    searchBarCont: {},
    addBtn: {
      height: 40,
      margin: 4,
      backgroundColor: 'orange',
      borderRadius: 5,
      width: 50,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    h1: {
      textAlign: 'center',
      fontSize: 15,
      fontWeight: 'bold',
    },
    addedFriend: {
      flexDirection: 'row',

      width: 250,
      height: 40,
      borderRadius: 10,
      backgroundColor: 'orange',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,

    },
    deletBtn: {
      width: 30,
      height: 30,
      borderRadius: 10,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    deletBtnTxt: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
    }
  })


  return (
     <View style={styles.mainCont}>
      <Text style={styles.h1}>My Friends</Text>
      <View style={styles.mainContPlaceholder}>
      {
          //added friends..
          Array.isArray(friendsArr) && !friendsArr.length ? null :
            <FlatList
            scrollEnabled={true}
            nestedScrollEnabled={true}
              data={friendsArr}
              renderItem={({ item }) => (<View style={styles.addedFriend}><Text>{item.name}</Text><Pressable style={styles.deletBtn} onPress={() => {deleteFriend(item)}}><Text style={styles.deletBtnTxt}>-</Text></Pressable></View>)}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={(() => (<Sepparator height={8} />))}
              contentContainerStyle={styles.contentCotainerStyle}
              style={styles.listContainer}
            />
        }
    

      </View>
      <View style={styles.mainContPlaceholder}>
      <TextInput placeholder="Search" onChangeText={(text) => {  searchForFriend(text) } } style={styles.textInput_small}/>
      {
          //added friends..
          Array.isArray(filteredResults) && !filteredResults.length ? null :
            <FlatList
            scrollEnabled={true}
            nestedScrollEnabled={true}
              data={filteredResults}
              renderItem={({ item }) => (<View style={styles.addedFriend}><Text>{item.name}</Text><Pressable style={[styles.deletBtn,{backgroundColor:'green'}]} onPress={() => {addClickedFriend(item)} }><Text style={[styles.deletBtnTxt]}>+</Text></Pressable></View>)}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={(() => (<Sepparator height={8} />))}
              contentContainerStyle={styles.contentCotainerStyle}
              style={styles.listContainer}
            />
        }
      </View>

     </View>
  
  );
}

export default FriendsScreen;