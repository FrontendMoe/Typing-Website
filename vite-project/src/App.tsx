import { ChangeEvent, useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import $ from 'jquery'
function App() {
  const inputRef = useRef(null)
  const [count, setCount] = useState(0)
  const [textToType, setTextToType] = useState<string>('hello /n from')
  const [typingText, setTypingText] = useState<string>('')
  const [calculs, setCalculs] = useState<boolean>(true)
  const [WPM, setWPM] = useState<Float>(0)
  const [CPM, setCPM] = useState<Float>(0)
  const [ACC, setACC] = useState<Float>(0)
  const [textShown, setTextShown] = useState<string>(textToType)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [incorrectCharacterCount, setIncorrectCharacterCount] = useState(0)

  useEffect(() => {
    $('#textArea').focus()
  }, [])
  useEffect(() => {
    // Original string
    if (typingText.length <= textToType.length) {
      const originalString = textToType
      // Starting index
      const startIndex = typingText.length

      // Get the portion of text from startIndex to the end
      const portionOfString = typingText + originalString.substring(startIndex)

      setTextShown(portionOfString)

      // Set the start time when typing begins
      if (typingText.length === 1) {
        setStartTime(Date.now())
      } else {
        const { wpm, cpm } = calculateCPMAndWPM()
        setWPM(wpm)
        setCPM(cpm)
        const accuracy = calculateAccuracy()
        setACC(accuracy)
      }
    }
  }, [typingText])
  const calculateCPMAndWPM = () => {
    if (startTime) {
      const endTime = Date.now()
      const timeElapsedInSeconds = (endTime - startTime) / 1000
      const wordCount = typingText.split(/\s+/).length
      const wpm = (wordCount / timeElapsedInSeconds) * 60
      const cpm = (typingText.length / timeElapsedInSeconds) * 60
      return { wpm: wpm.toFixed(2), cpm: cpm.toFixed(2) } // Return both WPM and CPM rounded to 2 decimal places
    }
    return { wpm: '0.00', cpm: '0.00' }
  }
  function countNewlines(text: string) {
    let val = 0
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '/' && text[i + 1] === 'n') {
        val++
        i = i + 2
      }
    }
    return val
  }
  const calculateAccuracy = () => {
    const totalCharacterCount =
      textToType.length - 2 * countNewlines(textToType)
    if (totalCharacterCount === 0) {
      return 100 // Default accuracy when no characters are typed
    }

    let incorrectCount = 0

    for (let i = 0; i < typingText.length; i++) {
      if (typingText[i] !== textToType[i]) {
        incorrectCount++
      }
    }

    const accuracy = (
      ((totalCharacterCount - incorrectCount) / totalCharacterCount) *
      100
    ).toFixed(2)
    console.log(incorrectCount)
    console.log(totalCharacterCount)
    return accuracy // Return accuracy as a percentage
  }

  useEffect(() => {
    const startIndex = typingText.length

    if (textToType[startIndex] === '/' && textToType[startIndex + 1] === 'n') {
      inputRef.current.value = typingText + '/n'
    }
  }, [typingText])
  useEffect(() => {
    console.log(textShown)
  }, [textShown])
  return (
    <div className="bg-[#fbfbfb] flex h-screen flex-col justify-between px-[2%] py-[1%]">
      <nav className="flex w-full justify-between">
        <div className="pr-1 flex items-center ">
          <p className="font-[600]">typing.works </p>
          <div className="h-[13px] w-[2px] border-2 border-[#fec000] bg-[#fec000]"></div>
        </div>
        {/* tools */}
        <div className="w-[150px] border"> tools</div>
      </nav>
      {/* Body */}
      <div className="flex space-x-4 w-full justify-center">
        {/* Calculs */}

        <div
          className={`${
            calculs && 'bg-white border'
          } space-y-[]  w-[60px] p-2 rounded-lg`}
        >
          {/* WPM */}
          <div className="w-full flex flex-row-reverse">
            <p
              className="w-fit cursor-pointer"
              onClick={() => setCalculs(!calculs)}
            >
              {calculs ? '-' : '+'}
            </p>
          </div>
          <div className={` ${!calculs && 'opacity-0'}`}>
            <div>
              <p className="text-[#7b6dee] text-xs font-semibold">WPM</p>
              <p>{WPM}</p>
            </div>
            {/* CPM */}
            <div>
              <p className="text-[#21d6c7] text-xs font-semibold">CPM</p>
              <p>{CPM}</p>
            </div>
            {/* ACC */}
            <div>
              <p className="text-[#ff5876] text-xs font-semibold">ACC</p>
              <p>{ACC}</p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div
          className="w-[80%] text-xl lg:w-[65%]"
          onClick={() => $('#textArea').focus()}
        >
          <p>
            {Array(textToType.length)
              .fill('')
              .map((e, i) =>
                textShown[i] === '/' && textShown[i + 1] === 'n' ? (
                  <br />
                ) : (
                  !(textShown[i - 1] === '/' && textShown[i] === 'n') && (
                    <span className="w-[5px] border px-1">{textShown[i]}</span>
                  )
                ),
              )}
          </p>
          <input
            type="text"
            id="textArea"
            ref={inputRef}
            // value={typingText}
            className="opacity-0 absolute"
            onChange={(e) => {
              if (
                e.nativeEvent.inputType === 'deleteContentBackward' &&
                typingText.length > 0
              ) {
                // Remove the last character from typingText
                setTypingText(typingText.slice(0, -1))
              } else {
                // Update typingText with the new input value
                setTypingText(e.target.value)
              }
            }}
          />
        </div>
      </div>
      {/* bottom panel */}
      <div className="">
        <div className="flex justify-between">
          <div></div>
          <div className="w-[50%] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            bottom box
          </div>
          <div className="shadow-[0_8px_30px_rgb(0,0,0,0.12)]">chat box</div>
        </div>
      </div>
    </div>
  )
}

export default App
