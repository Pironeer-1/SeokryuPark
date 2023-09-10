import React from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'
import {MD2Colors} from 'react-native-paper'

export default function App(){
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Text style={styles.text}>BLACKPINK</Text>
      <Text style={{fontSize: 20}}>" IN YOUR AREA "</Text>
    </SafeAreaView>
  )
}

console.log(MD2Colors.blue500);

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: MD2Colors.blue500
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold', 
    color: MD2Colors.blue200
  }
})