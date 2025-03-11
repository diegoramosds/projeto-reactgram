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
        <GoArrowUp onClick={handleTop} className="border border-sky-700 rounded-full hover:bg-zinc-900" size={30}/>
    </div>
  )
  }
  </>
    
  )
}

export default ScrollToTop