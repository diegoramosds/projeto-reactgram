import { GoArrowUp } from "react-icons/go"

const handleTop = () => {
    if(window.pageYOffset > 1000) {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }
}

const ScrollToTop = () => {
  return (
    <div className="flex justify-end fixed right-10">
        <GoArrowUp onClick={handleTop} className="border rounded-full" size={28}/>
    </div>
  )
}

export default ScrollToTop