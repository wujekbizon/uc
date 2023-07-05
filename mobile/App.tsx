/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import RectavaloWebView from './RectavaloWebView'
import Rectavalo from './Rectavalo'

function App(): JSX.Element {
  const [url, setUrl] = useState<String|undefined>('')
  const [error, setError] = useState<String|undefined>()

  // @ts-ignore
  const node_env = process.env.NODE_ENV

  useEffect(() => {
    try {      
      // @ts-ignore
      const staticPefix = Platform.select({
        android: 'android_asset/',
        ios: 'ios'
      }) ?? ''

      if (staticPefix === 'ios') {
        Rectavalo.sourceURLForWebView().then(r => {
          // @ts-ignore
          if (r.result != "DEBUG") {
            setUrl(() => {
              // @ts-ignore
              return r.result
            })
          }
        })
      }

      // @ts-ignore
      if (node_env === 'production' && staticPefix !== 'ios') {
        setUrl(() => {            
          // @ts-ignore
          return `file:///${staticPefix}react-static/index.html`
        })
      } else {
        // @ts-ignore
        import ('config:.env.js').then((config: any) => {
          console.log(`config: ${JSON.stringify(config)}. env: ${node_env}`)
          if (config.url) {
            setUrl((prev) => {
              // @ts-ignore
              if (prev.length === 0)
              return config.url
            })
          }
        })
      }
  } catch (e: any) {
    setError(() => {
      return `${e.message}\n${e.stack}`
    })
  }
  }, [])

  if (error) {
    return <pre>{error}</pre>
  }

  return (
    <RectavaloWebView url={url} />
  );
}

export default App;
