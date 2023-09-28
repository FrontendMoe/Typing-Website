import { useEffect } from 'react'
function BuyingCoffee({ isOpen, closeBuyMeCoffe }) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.buyMeCoffee')) {
        closeBuyMeCoffe()
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
    <div
      style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0rem 0.2rem 0.6rem 0rem' }}
      className="  bottom-[110%] absolute buyMeCoffee w-[300px] px-8 py-4 right-0 h-[500px] "
    >
      <p>Buy typing.works a coffee</p>
      <div>EMBED HTML CODE HERE FROM BUY ME COFFE</div>
    </div>
  )
}

export default BuyingCoffee
