import React from "react";
import {StyleSheet, SafeAreaView, Text, View} from 'react-native'
import { Platform, Dimensions } from "react-native";
import {MD2Colors} from 'react-native-paper'

console.log(Platform.OS);
const {width, height} = Dimensions.get('window');

export default function App() {
  return (
    <SafeAreaView style={[styles.safeAreaView]}>
      <Text style={[styles.text, {marginTop: 40}]}>os: {Platform.OS}</Text>
      <Text style={[styles.text]}>width: {width}</Text>
      <Text style={[styles.text]}>height: {height}</Text>

      <View style={[styles.box, styles.border]}></View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: MD2Colors.blue600,
    flex: 1,
    margin: '10%'
  },
  text: {
    fontSize: 20,
    color: MD2Colors.blue200,
    marginBottom: 10,
    marginLeft: 30
  },
  box: {
    height: 100,
    backgroundColor: MD2Colors.lime200,
    marginBottom: 10
  },
  border: {
    borderWidth: 10,
    borderColor: MD2Colors.blue900,
    borderRadius: 20
  }
})