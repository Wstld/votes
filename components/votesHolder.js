/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Text, View, TextInput, Button, Modal, StyleSheet, useWindowDimensions, ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Sepparator } from './sepparator';
import store from '../redux/store'


export const VoteHolder = (props) => {
    let votes = !props.votes.length ? [] : props.votes;
    const navigation = useNavigation();
    //use filter only my votes.
    /*if(votes != null){
        console.log(   "test",votes.filter( v => v.title.includes("How")) );
    }*/
    

    const { height, width } = useWindowDimensions();

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'column',
            backgroundColor: 'rgba(243, 242, 209, 1)',
            width: width - 100,
            height: 300,
            alignItems: 'center',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            borderRadius:10,
            marginBottom:20,

        },
        voteCardCont: {
            height: 50,
            width:'80%',
            backgroundColor: 'rgb(149, 166, 103)',
            borderRadius: 10,
            alignContent: 'stretch',
            justifyContent:'center',
            alignItems: 'center',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            alignSelf:'center'
            

        },
        listCont: {
            width: '90%',
            backgroundColor:'rgba(243, 242, 209, 1)',
            margin:10,
            

        },
        contentCotainerStyle:{
            paddingTop:10,
            paddingBottom:10,
        },
        header:{
            backgroundColor:'rgb(149, 166, 103)',
            width:'100%',
            height:40,

            margin:0,
            padding:0,
            alignSelf:'stretch',
            borderTopLeftRadius:10,
            borderTopRightRadius:10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderBottomColor:'rgb(240, 238, 240)',
            borderBottomWidth:2,
            textAlign:'center',
            textAlignVertical:'center',
            fontSize:20,
            color:'rgb(240, 238, 240)',
            textShadowColor:'black',
            textShadowRadius:5,
        },
        voteCardText:{
            color:'rgba(45, 43, 12, 1)',
            fontSize:15
        },
        noVotesText:{
            color:'rgba(45, 43, 12, 1)',
            fontSize:15,
            marginTop:15,
        }
    })
    
    const VoteCard = ({ item }) => {
        return (
            <Pressable onPress={() => navigation.navigate('Home', { screen: 'Details' })} style={styles.voteCardCont}>
                <View>
                    <Text style={styles.voteCardText}>{item.title}</Text>
                </View>
            </Pressable>
        )

    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
            <Text style={styles.header}>Votes</Text>
            
            {!votes.length ?
                <Text style={styles.noVotesText}>No Votes</Text>
                :
                <FlatList
                    data={votes}
                    renderItem={VoteCard}
                    keyExtractor={item => item.title}
                    ItemSeparatorComponent={(() => (<Sepparator height = {8}/>))}
                    contentContainerStyle={styles.contentCotainerStyle}
                    style={styles.listCont}
                />
            }
            </View>
            <Button
                title="Ask for Vote"
                color="rgb(149, 166, 103)"
            />

        </SafeAreaView>
        
    )


};