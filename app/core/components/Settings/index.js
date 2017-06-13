import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
    }
  }

  updateName = () => {
    this.props.updateName({ name: this.state.name });
    Keyboard.dismiss();
  }

  render() {
    const { name, updateName } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Type your name"
          placeholderTextColor="white"
          value={this.state.name}
          onChangeText={(name) => this.setState({ name })}
          style={styles.input}
          borderBottomColor="white"
          borderBottomWidth={1} />
        <TouchableOpacity style={styles.btnWrapper} onPress={this.updateName}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
styles = {
  container: {
    position: 'absolute',
    top: 40,
    left: 0,
    width: '100%',
    height: 100,
    paddingLeft: 30,
    backgroundColor: '#00ab8b'
  },
  input: {
    height: 50,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  btnText: {
    color: 'white',
  }
}