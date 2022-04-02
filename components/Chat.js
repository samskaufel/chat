import React from 'react';
import { View, Text, Button } from 'react-native';

export default class Chat extends React.Component {

  render() {
    // assigns a variable name to the prop name that is being called from the Start screen
    let name = this.props.route.params.name;
    // the user's name is rendered in the navigation bar
    this.props.navigation.setOptions({ title: name });
    
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hello Chat!</Text>
        <Button
          title='Back to start'
          // navigates user back to Start screen
          onPress={() => this.props.navigation.navigate('Start')}
        />
      </View>
    )
  }
}