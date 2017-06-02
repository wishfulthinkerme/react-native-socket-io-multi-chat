import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
class Message extends Component {

  state = {
    focused: false,
  }

  toggleFocus = () => {
    this.setState({
      focused: !this.state.focused,
    });
  }

  render() {
    let messageStyle = { ...styles.message };
    let containerStyle = { ...styles.container };
    const date = new Date(this.props.data.date).toLocaleString();
    if (this.props.mySocketId === this.props.data.authorId) {
      messageStyle = { ...messageStyle, ...styles.messageIfAuthor };
      containerStyle = { ...containerStyle, ...styles.containerIfAuthor };
    }
    return (
      <View style={containerStyle} >
        <TouchableOpacity onPress={this.toggleFocus} style={styles.wrapper}>
          <View style={messageStyle}>
            <Text style={styles.messageContent}>{this.props.data.content}</Text>
          </View>
          {this.state.focused && <Text style={styles.date}>{date}</Text>}
        </TouchableOpacity>
      </View >
    )
  }
}
const styles = {
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  containerIfAuthor: {
    justifyContent: 'flex-end',
  },
  wrapper: {
    flexDirection: 'column',
    width: '40%',
    marginBottom: 10,
  },
  messageContent: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  message: {
    marginLeft: 20,
    backgroundColor: 'grey',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 10,
  },
  messageIfAuthor: {
    backgroundColor: 'red',
    marginRight: 20,
    marginLeft: 0,
  }
}
Message.propTypes = {
  author: PropTypes.bool,
}
export default Message;