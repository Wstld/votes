import { BackgroundColor } from 'chalk';
import { map } from 'lodash';
import React from 'react';
import { Text, View, StyleSheet, useWindowDimensions  } from 'react-native';


const VoteResult = ({total,options,results})  => {
 

    const ResultStaple = ({percent,votes}) => {
        console.log("per",percent)
        const stapleStyle = StyleSheet.create({
            staple:{
                height:30,
                marginBottom:3,
                width:`${ percent <= 0 ? 100 : percent }%`,
                backgroundColor:`${ percent <= 0 ? 'rgba(207, 207, 207, 0.78)' : 'rgb(149, 166, 103)'}`,
                borderBottomColor: '#737373',
                alignItems:'flex-start',

            }
        })
        return(
            <View style = {stapleStyle.staple}>
                <Text>{votes}</Text>
            </View>
        )
    }
    
    const styles = StyleSheet.create({
        mainCont:{
            flexDirection:'row',
            backgroundColor:'rgba(243, 242, 209, 1)',
            width:'70%',
            padding:10,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            borderRadius:10,
        },
        optCont:{
            flexWrap:'wrap',
            paddingTop:10,
        },
        resultCont:{
            flexGrow:1,
            padding:10,
            borderLeftWidth:3,
            borderBottomWidth:3,
            borderColor:'black'
        },
        optText:{
            minWidth:30,
            maxWidth:100,
            height:30,
            marginBottom:3,
            borderBottomWidth:3,
            borderColor:'black',
            textAlign:'center',
            textAlignVertical:'bottom',
            fontSize:20,

        }

    })
  
  return (
     <View style={styles.mainCont} testID="resultComponent">
      <View style={styles.optCont}>
        {options.map( opt => (<Text style={styles.optText} numberOfLines = {1} ellipsizeMode="tail" adjustsFontSizeToFit={true} minimumFontScale={0.7}>{opt}</Text>))}
      </View>
      <View style={styles.resultCont}>
        { Object.entries(results).map(([key,value]) => (<ResultStaple key={key} votes={value} percent={ (value / total * 100).toFixed(1) } />)) }
      </View>
     </View>
  
  );
}

export default VoteResult;