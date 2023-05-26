import { useEffect, useRef } from 'react'

//  A custom hook that provides a reusable way to smooth scroll to a selected element.
export const useSmoothScroll = (selector, delay) => {
  // Create a ref for the selected element
  const selectRef = useRef(null)
  // Scroll to the selected element with smooth animation
  const scrollToSelectedFile = () => {
    const selected = selectRef?.current?.querySelector(selector)
    if (selected) {
      selected.scrollIntoView({
        behavior: 'instant',
        block: 'nearest',
      })
    }
  }
  // create debounce fn
  function debounce(fn, interval) {
    // Initialize timeoutId outside of returned function.
    let timeoutId = null
    // This is the debounced function that will be returned and executed later
    return (...args) => {
      // Clear previous timeout before setting new one
      clearTimeout(timeoutId)
      // Set a new timeout and save its ID to timeoutId variable
      timeoutId = setTimeout(() => {
        // Apply the original function with the provided arguments
        fn.apply(this, args)
      }, interval)
    }
  }

  const debouncedScroll = debounce(scrollToSelectedFile, delay)

  // adding error handlings
  useEffect(() => {
    if (!selector) {
      console.log('Error: Please provide a valid selector.')
      return
    }
    if (typeof delay !== 'number' || delay < 0) {
      console.log('Error: Please provide a valid delay value.')
      return
    }
  }, [selector, delay])

  return { selectRef, debouncedScroll }
}

// The options object in `scrollIntoView()` function is used to customize the scrolling behavior of the function.
// Here are the different properties we can set in the options object:
// 1. `block`: This specifies the vertical alignment of the element within its container. The accepted values are `"start"`, `"center"`, `"end"`, and `"nearest"`.
// 2. `inline`: This specifies the horizontal alignment of the element within its container. The accepted values are `"start"`, `"center"`, `"end"`, and `"nearest"`.
// 3. `behavior`: This sets the scrolling behavior. The accepted values are `"auto"`, `"smooth"`, and `"instant"`. The default is `"auto"`.
// 4. `boundary`: This allows you to specify a ScrollLogicalPosition that the element should align with when it hits the boundary of a container.
