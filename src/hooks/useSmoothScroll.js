import { useEffect, useRef } from "react";

//  A custom hook that provides a reusable way to smooth scroll to a selected element.
export const useSmoothScroll = (selector) => {
   // Create a ref for the selected element
  const selectRef = useRef(null);
  // Scroll to the selected element with smooth animation 
  const scrollToSelectedFile = () => {
    const selected = selectRef?.current?.querySelector(selector)
    if (selected) { 
      selected.scrollIntoView({ 
        behavior: "smooth", 
        block: "nearest" 
      }); 
    }
  }
  
  useEffect(() => {
    scrollToSelectedFile()
  },[])

  return {selectRef,scrollToSelectedFile}
}