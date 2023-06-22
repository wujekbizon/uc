import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import Rectavalo from './Rectavalo'

export default class RectavaloWebView extends Component {
  static propTypes = WebView.propTypes;

  render() {
    let webViewRef

    const nativeCall = async (message) => {
      try {
        const r = (await Rectavalo.nativeCall(message));
        if (typeof r.result === 'string') {
          console.log(`post message: ${r.result}`)
          webViewRef.postMessage(r.result)
        }
        else
          console.log(`bad Rectavalo result: ${typeof r.result} ${JSON.stringify(r)}`)
      } catch (e) {
        console.log(`nativeCall error: ${e.message}\n${e.stack}`)
      }
    }

    const onMessage = async (e) => {
      console.log(`onMessage: ${e.nativeEvent.data}`)
      nativeCall(e.nativeEvent.data)
    }

    return (
      <WebView 
        ref={WEBVIEW_REF => (webViewRef = WEBVIEW_REF)}
        style={{ height: "100%" }}
        source={{ uri: this.props.url }}
        startInLoadingState={true}
        onMessage={onMessage}
      />
    );
  }
}
