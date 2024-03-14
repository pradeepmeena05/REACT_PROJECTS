import { useState, useCallback, useEffect,useRef } from "react";


function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setnumAllow] = useState(false);
  const [charAllow, setcharAllow] = useState(false);

  const [password, setPassword] = new useState("");

     const passwordRef=useRef(null)

     const copytopass = useCallback(() => {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0, 999);
      window.navigator.clipboard.writeText(password)
    }, [password])

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllow) str += "0123456789"
    if (charAllow) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numAllow, charAllow, setPassword])


  useEffect(()=>{
     passwordGenerator()
  },[length, numAllow, charAllow,passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-xl shadow-slate-500 rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            value={password}
            className="outline-none w-full px-2 py-1"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button onClick ={copytopass} className="bg-blue-500 text-white outline-none px-3 py-0.5 shrink-0 hover:bg-blue-600">
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={10}
              max={99}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <lable>Length:{length}</lable>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className="cursor-pointer"
              defaultChecked={numAllow}
              onChange={() => {
                setnumAllow((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className="cursor-pointer"
              defaultChecked={charAllow}
              onChange={() => {
                setcharAllow((prev) => !prev);
              }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
