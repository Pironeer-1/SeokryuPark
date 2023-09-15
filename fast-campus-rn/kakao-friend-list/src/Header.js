import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const IconButton = (props) => {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Ionicons name={props.name} size={24} color="black" />
    </View>
  )
}

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>친구</Text>

      <View style={{ flexDirection: 'row' }}>
        <IconButton name="search" />
        <IconButton name="person-add-outline" />
        <IconButton name="musical-notes-outline" />
        <IconButton name="settings-outline" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'green',
    paddingVertical: 10
  },
  
  title: {
    fontSize: 22,
    fontWeight: "bold",
  }
})

export default Header