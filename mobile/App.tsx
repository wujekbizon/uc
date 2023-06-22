/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import RectavaloWebView from './RectavaloWebView'

function App(): JSX.Element {
  const [url, setUrl] = useState<String|undefined>('chrome:about')

  useEffect(() => {
    try {
      // @ts-ignore
      import ('config:.env.js').then((config: any) => {
        console.log(`config: ${JSON.stringify(config)}`)
          if (config.url) {
          setUrl(() => {
            return config.url
          })
        }
      })
  } catch (e) {

  }
  }, [])

  return (
    <RectavaloWebView url={url} />
  );
}

export default App;
