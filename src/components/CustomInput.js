import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomTextInput = ({placeholder, ...rest}) => {
  return (
    <View style={styles.action}>
      {/* <FontAwesome name={fontAwesome} color="#333333" size={20} /> */}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="black"
        autoCorrect={false}
        style={styles.textInput}
        {...rest}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,

    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    margin: 10,
    paddingLeft: 10,
    color: 'black',

    backgroundColor: 'white',
    borderRadius: 10,
  },
});
