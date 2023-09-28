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
    <iframe
      id="bmc-iframe"
      title="Buy Me a Coffee"
      style={{
        position: 'absolute',
        margin: '0px',
        border: '0px',
        right: '35px',
        bottom: '110%',
        height: '620px',
        opacity: '1',
        width: '420px',
        maxWidth: '420px',
        minHeight: '620px',
        maxHeight: '620px',
        borderRadius: '10px',
        boxShadow: 'rgba(13, 12, 34, 0.1) -6px 0px 30px',
        background:
          'url("https://cdn.buymeacoffee.com/assets/img/widget/loader.svg") center center / 64px no-repeat rgb(255, 255, 255) ',
        zIndex: '999999',
        transition: 'all 0.25s ease 0s',
        transformOrigin: 'right bottom',
        transform: 'scale(1)',
        userSelect: 'none',
      }}
      src="https://www.buymeacoffee.com/widget/page/typing.works?description=Support%20me%20on%20Buy%20me%20a%20coffee!&amp;color=%23FFDD00"
      bis_size='{"x":1081,"y":7,"w":420,"h":620,"abs_x":1081,"abs_y":7}'
      __idm_id__="30580737"
    ></iframe>
  )
}

export default BuyingCoffee
