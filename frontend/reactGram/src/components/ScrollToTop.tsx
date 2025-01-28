import { useEffect, useState } from "react"
import { GoArrowUp } from "react-icons/go"

const ScrollToTop = () => {

const [scrollTop, setScrollTop] = useState(false);

useEffect(() => {

const handleScroll = () => {
  if(document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    setScrollTop(true)
  } else {
    setScrollTop(false)
  } 
}

window.addEventListener("scroll", handleScroll)

return () => window.removeEventListener("scroll", handleScroll)

}, []);
 
const handleTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"})
     
} 

 return ( 
  <>
   {scrollTop && (
    <div className="flex justify-end fixed right-10 bottom-5"> 
        <GoArrowUp onClick={handleTop} className="border border-sky-700 rounded-full" size={28}/>
    </div>
  )
  }
  </>
    
  )
}

export default ScrollToTop