import { useEffect } from 'react'
import { BsChevronUp } from 'react-icons/bs'
export default function BottomBox({ isOpen, close }) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.BottomBox')) {
        close()
      }
    }

    // Add the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside)

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  if (!isOpen) {
    return null // Return nothing if the form is closed
  }
  return (
    <div className="fixed z-10  flex items-center justify-center  top-0 left-0 h-screen w-screen">
      <div
        style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0rem 0.4rem 0.8rem 0rem' }}
        className="BottomBox z-20 bg-white border rounded-xl  w-[70%] h-[80%]"
      >
        <div
          onClick={() => close()}
          className="w-fit mt-[-4%] mx-auto opacity-75 cursor-pointer leading-[10px]"
        >
          <p className="text-[10px]">{!isOpen ? 'Open' : 'Close'}</p>
          <BsChevronUp
            className={`mx-auto text-xl duration-150 ${
              !isOpen ? 'rotate-0' : ' rotate-180'
            }`}
          ></BsChevronUp>
        </div>
      </div>
    </div>
  )
}
