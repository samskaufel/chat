import React from "react";
import { View, StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import "firebase/firestore";
const firebase = require("firebase");
require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwmKV_HZ3HiAXg_g-h1sKGSXcPuT524NY",
  authDomain: "chat-app-48a9f.firebaseapp.com",
  projectId: "chat-app-48a9f",
  storageBucket: "chat-app-48a9f.appspot.com",
  messagingSenderId: "310189860472",
  appId: "1:310189860472:web:4467edc0a6a08e7d482f8d",
};

export default class Chat extends React.Component {
  constructor() {
    super();
    // state set with static message
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
    };
    // initializes firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    // references specific 'messages' Firestore collection within database
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.refUserMsgs = null;
  }

  componentDidMount() {
    // assigns a variable name to the prop name that is being called from the Start screen
    // sets the user's name state
    const {
      route: {
        params: { name },
      },
    } = this.props; 
    // firebase.auth() calls the Firebase Auth service for the app
    // onAuthStateChanged() is an observer that's called when the user's sign-in state changes and returns an unsubscribe() function
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      // updates user state with currently active user data
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
          avatar: "https://placeimg.com/140/140/any",
        },
      });
      // onSnapshot() listens for updates in the messages collection
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
    // creates a reference to the active user's document (messages)
    this.refUserMsgs = firebase
      .firestore()
      .collection("messages")
      .where("uid", "==", this.state.uid);
  }

  // unsubscribes from collection updates and stops listening to authentication
  componentWillUnmount() {
    this.unsubscribe();
  }

  // sets the 'messages' state with current data upon any updates
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // goes through each document
    querySnapshot.forEach((doc) => {
      // gets the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avater: data.user.avatar,
        },
      });
    });
    // function renders updates in the app
    this.setState({
      messages: messages,
    });
  };

  // adds messages to database
  addMessage() {
    const message = this.state.messages[0];
    // saves message objects to Firestore collection
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user,
    });
  }

  // function called when user sends a message
  // GiftedChat's append() function appends the new message to the 'messages' object
  // this allows the message that the user sends to be displayed in the chat
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
    () => {
      this.addMessage();
    });
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'blue',
          },
          left: {
            backgroundColor: 'gray',
          }
        }}
      />
    )
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
      <View style={{ flex: 1, backgroundColor: chatBg }}>
        <View style={styles.giftedChat}>
          {/* renders chat interface with default message */}
          <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{
              _id: 1,
              name: this.state.name,
            }}
          />
          {/* fixes UI bug for Android users so the keyboard does not cover the message input field */}
          {Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height" />
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 30,
  },
  giftedChat: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
  },
});
