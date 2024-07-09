'use client'
import { useState } from "react";

export default function Home() {

  
  const [info , setInfo] = useState([])
  const [title , setTitle] = useState('')
  const [explain , setExplain] = useState('')
  const cont = "Done"
  const id = Math.floor(Math.random() * 10000)


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
    <main className="container-app flex flex-col justify-center items-center">
      <div className="title flex flex-col justify-center items-center w-[80%] bg-white text-black mt-5 rounded-xl rounded-t-full py-7 gap-4">
        <h1 className="text-4xl font-bold">My Works</h1>
        <span className="text-xl">Today is Yesterday's Tomorrow</span>
      </div>
      <form className="input flex flex-col w-[30%] bg-white text-black rounded-b-[100px] border-t-4 border-t-black justify-center items-center py-10">
        
        <h1 className="text-2xl">What you have to do?</h1>
        
        <input
            className="w-[80%] h-[2.5rem] text-xl my-4 px-2 rounded-xl" 
            type="text" 
            placeholder="Your work"
            onChange={handlechange}
            value={title}
        />

        <textarea 
          className="w-[80%] h-[4rem] text-xl my-4 px-2 py-2 rounded-xl"  
          placeholder="Explain..."
          onChange={handlechangeT}
          value={explain}
        >
        </textarea>

        <button onClick={handleSubmit} className="delete px-4 py-1 text-[20px] mx-auto text-white rounded-2xl">Add</button>
      
      </form>
      
      <div className="cards mt-7 w-[65%] flex flex-col justify-center items-center">
        {info.map((item) => {
          return(
            <div key={item.id} className="card border-black border-2 w-[100%] bg-white flex justify-center items-center gap-7 rounded-xl"> 
              <div className="w-[30%] my-4 ml-4">
                  <h1 className="text-2xl font-bold text-center ">
                  {item.title}
                  </h1>
              </div>

              <div className="explien w-[70%] ml-2">
                  {item.explain}
              </div>

              <button onClick={() => dlete(item.id)} className="delete w-[10%] rounded-xl font-bold mx-4 py-2">
                  Done
              </button>
            </div>
          )
        })}
      </div>
  </main>
  );
}
