import React from "react";
import { SafeAreaView, Button, Alert} from "react-native";
import { TouchableOpacity, TouchableHighlight, Text } from "react-native";
import { TextInput } from "react-native";

const onPress = () => Alert.alert('home pressed', 'little message');
const pressWarning = () => Alert.alert('Warning', 'Told you NOT to Press!!!')

export default function App(){
  return (
    <SafeAreaView>
      <Text onPress={onPress}>Press Me</Text>
      <Button title="Do not Press" color="blue" onPress={pressWarning}></Button>

      <TextInput 
        placeholder="enter your name"
        onChangeText={(text: string) => console.log(text)}
        onFocus={() => console.log('Focused!')}
        onBlur={() => console.log('Blurred!')}
        onEndEditing={() => console.log('Editing End!')}
      />
    </SafeAreaView>
  )
}