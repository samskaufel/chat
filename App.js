import React from "react";
import "react-native-gesture-handler";
// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import the 2 screens for this app
import Start from "./components/Start";
import Chat from "./components/Chat";
// creates the navigator
const Stack = createStackNavigator();
/* React Navigation method.
The Stack object will be used for the Navigator and Screen components */

// exports Chat app's main App component that renders the start page
export default class App extends React.Component {
  render() {
    return (
      // tells navigator to add navigation to "Start" and "Chat" screen
      <NavigationContainer>
        {/* creates navigation stack */}
        <Stack.Navigator initialRouteName="Start">
          {/* name prop is the handler used to navigate to the screen */}
          {/* component prop is the component you want to display as the screen */}
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
