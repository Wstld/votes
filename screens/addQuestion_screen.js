/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Modal, Pressable, Text, TextInput, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useDispatch, useSelector, batch } from 'react-redux';
import { addQuestionSlice, setQuestion } from '../redux/features/addQuestionSlice';
import { Sepparator } from '../components/sepparator';
import store from '../redux/store';
import { useEffect } from 'react';

const AddQuestionScreen = (navigator) => {
  const dispatch = useDispatch();
  let friendsFromDB = useSelector(state => state.login.userData.friends)
  const friendsForState = Object.entries(friendsFromDB).map(([key, value]) => ({ clicked: false, ...value }));

  useEffect(() => {
    dispatch(addQuestionSlice.actions.setUserFriends(friendsForState));
  },[friendsFromDB]);

  const friends = useSelector(state => state.addQuestion.userFriends);

  
  let optModalOpen = useSelector(state => state.addQuestion.optionsModalOpen);
  let friendsModalOpen = useSelector(state => state.addQuestion.friendsModalOpen);
  let addedFriends = useSelector(state => state.addQuestion.addedFriends);
  let addedOptions = useSelector(state => state.addQuestion.options);


  const dummyText = "Describe your question"


  function deletFriendFromList(friend) {
    dispatch(addQuestionSlice.actions.deleteFriend(friend));
  }

  function deletFromOptions(option) {
    dispatch(addQuestionSlice.actions.deleteOpt(option));
  }

  function addToList(item) {
    let index = friends.findIndex((e) => (e.id === item.id));
    batch(() => {
      dispatch(addQuestionSlice.actions.updateClicked(index));
      dispatch(addQuestionSlice.actions.addFriends(friends[index]));
    })


  }

  function addOption() {
    batch(() => {
      dispatch(addQuestionSlice.actions.addOption(store.getState().addQuestion.typedOption));
      dispatch(addQuestionSlice.actions.typedOption(''));
      dispatch(addQuestionSlice.actions.toggelOptionsModal());
    });
  }

  function createVote() {
    const title = store.getState().addQuestion.title;
    const id = `${title.replace(/\s/g, "_")}_${store.getState().login.user.uid}`;
    const desc = store.getState().addQuestion.description;
    const options = store.getState().addQuestion.options;
    const voters = Object.assign({}, ...store.getState().addQuestion.addedFriends.map(item => (
      {
        [item.id]: {
          voted: false,
        }
      }
    )));
    const result = Object.assign({}, ...options.map(item => ({ [item]: 0 })));
    //add self to voters
    voters[store.getState().login.user.uid] = {voted:false};

    let vote = {
      id: id,
      title: title,
      description: desc,
      options: options,
      result: result,
      voters: voters,
    };

    return vote;
  }

  function addQuestion() {
    const vote = createVote();
    dispatch(setQuestion(vote));
  }


  const styles = StyleSheet.create({
    contentCotainerStyle:{
    },
    mainCont: {
      paddingTop:10,
    },
    listContainer: {
      maxHeight: 100,
      marginTop: 10,

    },
    mainContPlaceholder: {
      minHeight: 100,
      backgroundColor: 'white',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      alignSelf: 'center',
      width: 320,
      borderRadius: 10,
    },
    textInput_small: {
      backgroundColor: 'white',
      minHeight: 50,
      marginRight: 20,
      marginLeft: 20,
      borderRadius: 10,
      paddingLeft: 20,
    },
    textInput_big: {
      backgroundColor: 'white',
      minHeight: 50,
      marginLeft: 20,
      marginRight:20,
      borderRadius: 10,
    },
    modalCont: {
      backgroundColor: 'white',
      minHeight: 200,
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
    modalPlaceholder: {
      minHeight: 20,
      backgroundColor: 'white'
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
    friendBtnActive: {
      width: 250,
      height: 40,
      borderRadius: 10,
      backgroundColor: 'green',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    },
    friendBtnDeAct: {
      width: 250,
      height: 40,
      borderRadius: 10,
      backgroundColor: 'red',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
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
    <View style={styles.mainCont} nestedScrollEnabled={true} scrollEnabled={true}>
      <Text style={styles.h1}>Title</Text>
      <TextInput placeholder="Title" style={styles.textInput_small} onChangeText={(text) => dispatch(addQuestionSlice.actions.setTitle(text))} />
      <Text style={styles.h1}>Options</Text>
      <TextInput placeholder={dummyText} multiline={true} style={styles.textInput_big} onChangeText={(text) => dispatch(addQuestionSlice.actions.setDesc(text))} />

      <Text style={styles.h1}>Friends</Text>
      <View style={styles.mainContPlaceholder}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={friendsModalOpen}
        >
          <View style={styles.modalCont}>
            <Text style={styles.h1}>My Friends</Text>
            <View style={styles.modalPlaceholder}>
              {
                Array.isArray(friends) && !friends.length ? null :
                  <FlatList
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    data={friends}
                    renderItem={({ item }) => (
                      <View>
                        <Pressable disabled={item.clicked} onPress={() => addToList(item)} style={item.clicked ? styles.friendBtnDeAct : styles.friendBtnActive}>
                          <Text>{item.name}</Text>
                        </Pressable>
                        <Text>-</Text>
                      </View>
                    )}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={(() => (<Sepparator height={1} />))}
                    style={styles.listContainer}
                    contentContainerStyle={styles.contentContainerStyle}
                  />}
            </View>
            <Pressable style={styles.addBtn} onPress={() => { dispatch(addQuestionSlice.actions.toggelFriendsModal()) }}><Text>Close</Text></Pressable>
          </View>
        </Modal>

        {
          //added friends..
          Array.isArray(addedFriends) && !addedFriends.length ? null :
            <FlatList
            scrollEnabled={true}
            nestedScrollEnabled={true}
              data={addedFriends}
              renderItem={({ item }) => (<View style={styles.addedFriend}><Text>{item.name}</Text><Pressable style={styles.deletBtn} onPress={() => deletFriendFromList(item)}><Text style={styles.deletBtnTxt}>-</Text></Pressable></View>)}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={(() => (<Sepparator height={8} />))}
              contentContainerStyle={styles.contentCotainerStyle}
              style={styles.listContainer}
            />
        }

        <Pressable style={styles.addBtn} onPress={() => dispatch(addQuestionSlice.actions.toggelFriendsModal())}>
          <Text>+</Text>
        </Pressable>
      </View>

      <Text style={styles.h1}>Options</Text>
      <View style={styles.mainContPlaceholder}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={optModalOpen}
        >
          <View style={styles.modalCont}>
            <TextInput onChangeText={(text) => dispatch(addQuestionSlice.actions.typedOption(text))} placeholder="Option" style={[styles.textInput_small, { backgroundColor: 'rgb(245, 245, 245)' }]} />
            <Pressable style={styles.addBtn} onPress={() => addOption()}>
              <Text>Add</Text>
            </Pressable>
            <Pressable style={styles.addBtn} onPress={() => { dispatch(addQuestionSlice.actions.toggelOptionsModal()) }}><Text>Close</Text></Pressable>
          </View>
        </Modal>
        {
          //added options..
          Array.isArray(addedOptions) && !addedOptions.length ? null :
            <FlatList
            scrollEnabled={true}
            nestedScrollEnabled={true}
              data={addedOptions}
              renderItem={({ item }) => (<View style={styles.addedFriend}><Text>{item}</Text><Pressable style={styles.deletBtn} onPress={() => deletFromOptions(item)}><Text style={styles.deletBtnTxt}>-</Text></Pressable></View>)}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={(() => (<Sepparator height={8} />))}
              contentContainerStyle={styles.contentCotainerStyle}
              style={styles.listContainer}
            />
        }

        <Pressable style={styles.addBtn} onPress={() => dispatch(addQuestionSlice.actions.toggelOptionsModal())}>
          <Text>+</Text>
        </Pressable>
      </View>

      <Pressable style={styles.addBtn} onPress={() => addQuestion()}>
        <Text>Add</Text>
      </Pressable>
    </View>

  );
}

export default AddQuestionScreen;