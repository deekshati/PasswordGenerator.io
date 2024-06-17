import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length,setLength] = useState(8);
  const [numberAllow,setnumberAllow] = useState(false);
  const [charAllow,setcharAllow] = useState(false);
  const [password,setPassword] = useState("")

  const passwordRef = useRef(null)

const passwordgenerator = useCallback(() => {
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllow) str+="0123456789"
  if(charAllow) str+= "!@#$%^&**()(_}"

  for(let i=1; i<=length; i++){
    let char = Math.floor(Math.random() * str.length+1)
    pass += str.charAt(char)
  }
 setPassword(pass)
},[length,numberAllow,charAllow,setPassword])

useEffect(()=>{
  passwordgenerator()
},[length,numberAllow,charAllow,passwordgenerator])

const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select()
  /*passwordRef.current?.setSelectionRange(0,3); #for selecting particular range*/ 
  window.navigator.clipboard.writeText(password)

},[password])




  return (
    
        <>
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg
        px-4 py-3 my-8 text-white bg-gray-800">
          <h2 className="text-green-500 text-center my-3 font-serif font-bold">Password Generator</h2>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
        type="text"
        value={password}
        className="outline-none w-full py-1 px-3"
        placeholder="password"
        readOnly
        ref={passwordRef}
        />
        <button onClick ={copyPasswordToClipboard} 
        className="outline-none bg-blue-700 text-white
        px-3 py=0.5 shrink-0">copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}/>
            <label>length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
            type="checkbox"
            defaultChecked={numberAllow}
            id="numberInput"
            onChange={()=>{
              setnumberAllow((prev)=>!prev);
            }}/>
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
            type="checkbox"
            defaultChecked={charAllow}
            id="characterInput"
            onChange={()=>{
              setnumberAllow((prev)=>!prev);
            }}/>
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
        </div>  
        </>      
   
  )
}

export default App
