/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import RectavaloWebView from './RectavaloWebView'


function App(): JSX.Element {
  const [url, setUrl] = useState<String|undefined>('chrome:about')
  const [error, setError] = useState<String|undefined>()

  useEffect(() => {
    try {
      // @ts-ignore
      if (process.env.NODE_ENV === 'production') {
        // @ts-ignore
        const staticPefix = Platform.select({
          android: 'android_asset/',
          // todo: this probably won't work'
          ios: './'
        }) ?? ''

        setUrl(() => {
          // @ts-ignore
          return `file:///${staticPefix}react-static/index.html`
        })
      } else {
        // @ts-ignore
        import ('config:.env.js').then((config: any) => {
          console.log(`config: ${JSON.stringify(config)}`)
            if (config.url) {
              setUrl(() => {
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
