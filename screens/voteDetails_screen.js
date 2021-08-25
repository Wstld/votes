import React from 'react';
import { Text, View, StyleSheet, useWindowDimensions, Button } from 'react-native';
import { useSelector } from 'react-redux';
import VoteResult from '../components/voteResult'
import store from '../redux/store';

const VoteDetails = ({ navigaton, route }) => {
  const { innerHeight, width } = useWindowDimensions();
  const id = route.params.voteId;
  
  //array with vote with matching id.
  let data = useSelector(state => state.login.userData.votes.filter(e => e.id === id));
  let hasUserVoted = data[0].vote.voters.filter(e => e.id === store.getState().login.user.uid)[0].voted; 

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

    }
  })
  
  console.log(data[0].vote.voters.filter(e => e.id === store.getState().login.user.uid)[0].voted)

  //should have error handling for id/Db missmatch. 
  //create modal on vote tap.
  return (
    <View style={styles.mainCont}>
      <Text style={styles.title}>{data[0].title}</Text>
      <View style={styles.descpCont}>
        <Text>{data[0].description}</Text>
      </View>
      <VoteResult total={data[0].vote.voters.length} options={data[0].options} results={data[0].vote.result} />
      <Text style={styles.sumTxt}>{`${data[0].vote.voters.map(e => e.voted === true).length}/${data[0].vote.voters.length}`}</Text>
      <Button title="Vote" disabled={hasUserVoted}/>
    </View>

  );
}

export default VoteDetails;