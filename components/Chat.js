import React from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {

  constructor() {
    super();
    // state set with static message
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {

    // assigns a variable name to the prop name that is being called from the Start screen
    // this variable is then rendered in the static message and system message
    let name = this.props.route.params.name;
    // sets the state with a static message and system message
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello' + ' ' + name,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: name + ' ' + 'has joined the chat',
          createdAt: new Date(),
          system: true,
        },
      ],
    })
  }

  // function called when user sends a message
  // GiftedChat's append() function appends the new message to the 'messages' object
  // this allows the message that the user sends to be displayed in the chat
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    // assigns a variable name to the prop name that is being called from the Start screen
    let name = this.props.route.params.name;
    // assigns a variable name to the prop chatBg that is being called from the Start screen
    let chatBg = this.props.route.params.chatBg;
    // the user's name is rendered in the navigation bar
    this.props.navigation.setOptions({ title: name });
    
    return (
      // the selected background color is rendered in the chat screen
      <View 
        style={{flex: 1, backgroundColor: chatBg}} 
      >
        {/* renders chat interface with default message and system message */}
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
          />
          {/* fixes UI bug for Android users so the keyboard does not cover the message input field */}
          { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null } 

        {/* <TouchableOpacity
          style={styles.button}
          // navigates user back to Start screen
          onPress={() => this.props.navigation.navigate('Start')} >
          <Text style={styles.buttonText}>Back to Start</Text>
          </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  text: {
    color: 'white',
    fontSize: 30,
  },
  // button: {
  //   borderWidth: 1,
  //   height: 40,
  //   margin: 40,
  //   padding: 10,
  //   borderColor: 'white',
  // },
  // buttonText: {
  //   color: 'white',
  // }
})

