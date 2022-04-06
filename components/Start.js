import React from "react";

// imports components from React Native
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';


// the app's Start component that renders the start page UI
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "", // the state where user enters their name is empty by default
      chatBg: undefined, // chatBackground is undefined by default
    };
  }

  // function that allows user to select their chat background color
  chooseColor = (selectedColor) => this.setState({ chatBg: selectedColor });

  // color array for background
  colors = {
    black: "#090c08",
    darkPurple: "#474056",
    grayBlue: "#8a95a5",
    sage: "#b9c6ae",
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("./img/ImageBackground.png")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <Text style={styles.appTitle}>Chat</Text>

          <View style={styles.whiteBox}>
            <View style={styles.inputBox}>
              {/* imports user icon */}
              <Image source={require("./img/icon.png")} style={styles.icon} />
              {/* TextInput component where user will type their name */}
              <TextInput
                style={styles.yourNameText}
                /* this function updates empty state to user's name via 
                setState a.k.a passes name to state */
                onChangeText={(name) => this.setState({ name })}
                // value gets passed to onChangeText
                value={this.state.name}
                placeholder="Your Name"
              />
            </View>
            <Text style={styles.chooseBackgroundColorText}>
              Choose Background Color
            </Text>
            <View style={styles.colorChoices}>
              {/* TouchableOpacity makes views responsive to touches */}
              <TouchableOpacity
                style={styles.black}
                accessible={true}
                accessibilityLabel="black"
                accessibilityHint="Lets you choose a black chat background"
                accessibilityRole="button"
                onPress={() => this.chooseColor(this.colors.black)} // user selects color from array
              />
              <TouchableOpacity
                style={styles.darkPurple}
                accessible={true}
                accessibilityLabel="dark purple"
                accessibilityHint="Lets you choose a dark purple chat background"
                accessibilityRole="button"
                onPress={() => this.chooseColor(this.colors.darkPurple)}
              />
              <TouchableOpacity
                style={styles.grayBlue}
                accessible={true}
                accessibilityLabel="gray-blue"
                accessibilityHint="Lets you choose a gray-blue chat background"
                accessibilityRole="button"
                onPress={() => this.chooseColor(this.colors.grayBlue)}
              />
              <TouchableOpacity
                style={styles.sage}
                accessible={true}
                accessibilityLabel="sage"
                accessibilityHint="Lets you choose a sage chat background"
                accessibilityRole="button"
                onPress={() => this.chooseColor(this.colors.sage)}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              accessible={true}
              accessibilityLabel="Start chatting"
              accessibilityHint="Navigates to the chat screen"
              accessibilityRole="button"
              /* when user presses button, the function navigates to the Chat 
              screen and passes the state name and background color from the 
              Start Screen to the Chat screen */
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  chatBg: this.state.chatBg,
                })
              }>
                <Text style={styles.buttonText}>Start Chatting</Text>
              </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  appTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    height: "50%",
    paddingTop: 70,
  },
  whiteBox: {
    backgroundColor: "#FFFFFF",
    height: "44%",
    width: "88%",
    justifyContent: "center",
  },
  inputBox: {
    flexDirection: 'row',
    width: '88%',
    borderColor: '#757083',
    borderWidth: 2,
    padding: 10,
    color: '#757083',
    opacity: 0.5,
    margin: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  yourNameText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },
  chooseBackgroundColorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1,
    padding: 20,
  },
  colorChoices: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    padding: 20,
  },
  black: {
    backgroundColor: "#090c08",
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  darkPurple: {
    backgroundColor: "#474056",
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  grayBlue: {
    backgroundColor: "#8a95a5",
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  sage: {
    backgroundColor: "#b9c6ae",
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  button: {
    backgroundColor: "#757083",
    alignItems: "center",
    width: "88%",
    padding: 20,
    margin: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
