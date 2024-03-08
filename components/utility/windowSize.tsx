import { useState, useEffect } from 'react'
import { WindowSizeProps } from './interfacePropsManager'
const useWindowSize = () => {
 const [windowSize, setWindowSize] = useState<WindowSizeProps>({
   width: 0,
   height: 0,
 })

 useEffect(() => {
   function handleResize() {
     setWindowSize({
       width: window.innerWidth,
       height: window.innerHeight,
     })
   }
   window.addEventListener('resize', handleResize)
   handleResize()
   return () => window.removeEventListener('resize', handleResize)
 }, [])

 return windowSize
}

export default useWindowSize