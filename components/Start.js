import React, { Component } from 'react';

// imports components from React Native
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';

// the app's Start component that renders the start page UI
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: ''}; // the state where user enters their name is empty by default
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground 
        source={require('./img/ImageBackground.png')}
        resizeMode='cover'
        style={styles.image}>

        <Text
        style={styles.appTitle}
        >Chat</Text>

        {/* TextInput component where user will type their name */}
        <TextInput 
          style={styles.text}
          // this function updates empty state to user's name via setState aka passes name to state
          onChangeText={(name) => this.setState({ name })}
          // value gets passed to onChangeText
          value={this.state.name}
          placeholder='Your Name'
        />
        <Button
          title='Start Chatting'
          /* when user presses button, the function navigates to the Chat screen and passes
          the state name from the Start Screen to the Chat screen */
          onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name })}
        />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex:1, 
    justifyContent: 'center'
  },
  appTitle: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 84,
    textAlign: 'center',

  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 0.5,
    textAlign: 'center'
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },

})

