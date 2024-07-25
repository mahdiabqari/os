'use client'
import { useState } from "react";
import Work from "./work";
export default function Home() {

  
  const [info , setInfo] = useState([])
  const [title , setTitle] = useState('')
  const [explain , setExplain] = useState('')
  const cont = "Done"
  const id = Math.floor(Math.random() * 10000)
  const [check , setCheck] = useState(true)


  const handlechange = (e) => {
    setTitle(e.target.value);
  }
  const handlechangeT = (e) => {
    setExplain(e.target.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    if(title){
      setInfo([
        ...info,
        { title:title , explain:explain , id:id }
      ])

      setTitle('')
      setExplain('')
    }
    else{
      alert('Please write something...')
    }
  }

  const dlete = (id) => {
    setInfo(info.filter((e) => e.id !== id))
}


  return (
    <main className="container-app h-screen md:h-full flex flex-col justify-center items-center">
      <div className="title flex flex-col justify-center items-center w-[80%] md:w-[95%] bg-white text-black mt-5 rounded-xl rounded-t-full py-7 gap-4">
        <h1 className="text-4xl font-bold md:text-[30px]">My Works</h1>
        <span className="text-xl md:text-[17px] md:bg-blue-400 md:px-2 md:rounded-[5px]">Today is Yesterday's Tomorrow</span>
      </div>
      <form className="input flex flex-col w-[30%] md:w-[70%] md:rounded-b-xl bg-white text-black rounded-b-[100px] border-t-4 border-t-black justify-center items-center py-10">
        
        <h1 className="text-2xl md:text-xl">What you have to do?</h1>
        
        <input
            className="w-[80%] h-[2.5rem] md:h-[2.25rem] md:my-3 md:mt-7 text-[17px] text-xl my-4 px-2 rounded-xl" 
            type="text" 
            placeholder="Your work"
            onChange={handlechange}
            value={title}
        />

        <textarea 
          className="w-[80%] h-[4rem] md:h-[3.5rem] md:my-3 text-[17px] text-xl my-4 px-2 py-2 rounded-xl"  
          placeholder="Tips..."
          onChange={handlechangeT}
          value={explain}
        >
        </textarea>

        <button onClick={handleSubmit} className="delete md:text-[18px] md:rounded-xl md:mt-5 px-4 py-1 text-[20px] mx-auto text-white rounded-2xl">Add</button>
      
      </form>
      
      <Work Info={info} Delete={dlete}/>

  </main>
  );
}
