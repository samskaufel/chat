import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';

export default class Chat extends React.Component {

  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hello Chat!</Text>
        <Button
          title='Back to start'
          onPress={() => this.props.navigation.navigate('Start')}
        />
      </View>
    )
  }
}