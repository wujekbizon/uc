const chromeWebView = window?.chrome?.webview?.postMessage !== undefined
const reactNativeWebView = window?.ReactNativeWebView?.postMessage !== undefined
const darwinWebView = window?.webkit?.messageHandlers?.callbackHandler?.postMessage !== undefined
const iosWebView = navigator.userAgent.indexOf('iPhone') >= 0 || navigator.userAgent.indexOf('iPad') >= 0

let _callbackId = -1
let _resolveQueue = {}

const addMessageEventListener = (nativeMessage) => {
  reactNativeWebView && window.addEventListener('message', nativeMessage, true)
  chromeWebView && window.chrome.webview.addEventListener('message', nativeMessage, true)
  darwinWebView && window.addEventListener('message', nativeMessage, true)
}

const removeMessageEventListener = (nativeMessage) => {
  reactNativeWebView && document.removeEventListener('message', nativeMessage, true)
  chromeWebView && window.chrome.webview.removeEventListener('message', nativeMessage, true)
  darwinWebView && window.removeEventListener('message', nativeMessage, true)
}

const postMessage = (body) => {
  chromeWebView && window.chrome.webview.postMessage(JSON.stringify(body))
  reactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify(body))
  darwinWebView && window.webkit.messageHandlers.callbackHandler.postMessage(JSON.stringify(body))
}

const nativeCallx1Param = (p) => {
  p.callbackId = ++_callbackId

  queueMicrotask(() => { postMessage(p) })
  
  return new Promise(resolve => {
    _resolveQueue[p.callbackId] = resolve
  })
}

const nativeCall = (fn, ...args) => {
  if (fn === undefined) {
    throw new Error(`postAction: fn required.`)
  }

  const callbackId = ++_callbackId

  queueMicrotask(() => { postMessage({fn, callbackId, args}) })

  return new Promise(resolve => {
    _resolveQueue[callbackId] = resolve
  })
}

const nativeMessage = (...args) => {
  if (!args[0])
    return

  if (typeof args[0].data === 'string') {
    if (args[0].data.startsWith('webpackHotUpdate')) {
      removeMessageEventListener()
      return
    }
  } else {
    // non string data indicates some other message type
    return
  }

  try {
    // we could now ignore anything that doesn't have a callbackId
    let result = JSON.parse(args[0].data)

    if (result.callbackId > -1) {
      try  {
        if (typeof _resolveQueue[result.callbackId] !== 'function') {
          // happens after hot reload
          return
        }
        let resolve = _resolveQueue[result.callbackId]
        queueMicrotask(() => resolve(result) )
        _resolveQueue[result.callbackId] = undefined
      } catch (e2) {
        console.log(`callback resolver ${result.callbackId} failed: ${e2.message}\n${e2.stack}`)
      }
    }

  } catch (e) {
    console.log(`error parsing result: ${args[0].data.substring ? args[0].data.substring(0, 10) : '<>'}\n${e.message}\n${e.stack}`)
  }
}

export { 
  chromeWebView, 
  reactNativeWebView, 
  darwinWebView, 
  iosWebView,
  addMessageEventListener,
  removeMessageEventListener,
  nativeCall,
  nativeCallx1Param,
  nativeMessage
}
