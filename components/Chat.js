import React from "react";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import "firebase/firestore";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from 'react-native-maps';
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
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
      },
      isConnected: false,
      image: null,
      location: null,
    };

    // initializes Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // references specific 'messages' Firestore collection within database
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  // sets the 'messages' state with current data upon any updates
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // goes through each document
    querySnapshot.forEach((doc) => {
      // Get the QueryDocumentSnapshot's data
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
        },
      });
    });
    // function renders updates in the app
    this.setState({
      messages: messages,
    });
    this.saveMessage();
  };

  // gets messages from asyncStorage
  // async function that retrieves chat messages and converts the saved string back into an object
  getMessages = async () => {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Saves messages with asyncStorage
  saveMessage = async () => {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // Deletes messages from asyncStorage
  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  componentDidMount() {
    // sets the user's name state
    const {
      route: {
        params: { name },
      },
    } = this.props;
    this.props.navigation.setOptions({ title: name });
    // checks user's connection status using fetch() method
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        // listens for updates in the collection
        this.unsubscribe = this.referenceChatMessages
          .orderBy("createdAt", "desc")
          .onSnapshot(this.onCollectionUpdate);
        // firebase.auth() calls the Firebase Auth service for the app
        // onAuthStateChanged() is an observer that's called when the user's sign-in state changes and returns an unsubscribe() function
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              return await firebase.auth().signInAnonymously();
            }
            // updates user state with currently active user data
            this.setState({
              uid: user.uid,
              messages: [],
              user: {
                _id: user.uid,
                name: name,
              },
              isConnected: true,
            });
          });
        this.saveMessage();
      } else {
        this.setState({ isConnected: false });
        // loads messages from asyncStorage
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    if (this.state.isConnected) {
      // Stop listening to authentication
      this.authUnsubscribe();
      // Stop listening for changes
      this.unsubscribe();
    }
  }

  addMessage() {
    const message = this.state.messages[0];
    // Add a new message to collection
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
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
        this.saveMessage();
      }
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "black",
          },
          left: {
            backgroundColor: "white",
          },
        }}
      />
    );
  }

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  render() {
    // assigns a variable name to the prop name that is being called from the Start screen
    let name = this.props.route.params.name;
    // the user's name is rendered in the navigation bar
    this.props.navigation.setOptions({ title: name });
    // assigns a variable name to the prop chatBg that is being called from the Start screen
    let chatBg = this.props.route.params.chatBg;

    return (
      <View style={styles.container}>
        <View
          style={{ backgroundColor: chatBg, width: "100%", height: "100%" }}
        >
          <GiftedChat
            style={styles.giftedChat}
            renderBubble={this.renderBubble.bind(this)}
            renderInputToolbar={this.renderInputToolbar.bind(this)}
            renderActions={this.renderCustomActions}
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{
              _id: this.state.user._id,
              name: this.state.name,
            }}
          />
          {Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height" />
          ) : null}
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Button
              title="Pick an image from the library"
              onPress={this.pickImage}
            />
            <Button title="Take a photo" onPress={this.takePhoto} />
            {this.state.image && (
              <Image
                source={{ uri: this.state.image.uri }}
                style={{ width: 200, height: 200 }}
              />
            )}

            <Button title="Get my location" onPress={this.getLocation} />

            {this.state.location && (
              <MapView
                style={{ width: 300, height: 200 }}
                region={{
                  latitude: this.state.location.coords.latitude,
                  longitude: this.state.location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
            )}
          </View>
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
