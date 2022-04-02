import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Chat extends React.Component {

  render() {
    // assigns a variable name to the prop name that is being called from the Start screen
    let name = this.props.route.params.name;
    // assigns a variable name to the prop chatBg that is being called from the Start screen
    let chatBg = this.props.route.params.chatBg;
    // the user's name is rendered in the navigation bar
    this.props.navigation.setOptions({ title: name });
    
    return (
      // the selected background color is rendered in the chat screen
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: chatBg}}>
        <Text style={styles.text}>Hello!</Text>
        <TouchableOpacity
          style={styles.button}
          // navigates user back to Start screen
          onPress={() => this.props.navigation.navigate('Start')} >
          <Text style={styles.buttonText}>Back to Start</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  text: {
    color: 'white',
    fontSize: 30,
  },
  button: {
    borderWidth: 1,
    height: 40,
    margin: 40,
    padding: 10,
    borderColor: 'white',
    
  },
  buttonText: {
    color: 'white',
  }
})

