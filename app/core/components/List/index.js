import React, { Component } from 'react';
import {
  View, ScrollView, Text
} from 'react-native';
import Message from './../Message';
import InfoMessage from './../InfoMessage';
export default class List extends Component {

  displayRow = (data, key) => {
    switch (data.type) {
      case 'message':
        return <Message key={key} data={data} mySocketId={this.props.mySocketId} />;
        break;
      case 'settingsChanged':
        return <InfoMessage key={key} text={`${data.oldName} has changed name to ${data.newName}`} />
        break;
      case 'exitChat':
        return <InfoMessage  key={key} text={`${data.name} has exit the chat`} />
      break;
      case 'enterChat':
        return <InfoMessage key={key} text={`${data.name} has joined the chat`} />
      break;
    }
  }

  render() {
    const { messages } = this.props;
    return (
      <ScrollView style={styles.scroll}
        ref={ref => this.scrollView = ref}
        onContentSizeChange={(contentWidth, contentHeight) => {
          this.scrollView.scrollToEnd({ animated: false });
        }}
      >
        {messages.map(this.displayRow)}
      </ScrollView>
    );
  }
}

const styles = {

  scroll: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#eef2f2',
  },
}