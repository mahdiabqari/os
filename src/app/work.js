'use client'

export default function Work({Info , Delete}) {
    return(
        <div className="cards mt-7 w-[65%] md:w-[95%] flex flex-col justify-center items-center">
            {Info.map((item) => {
            return(
                <div key={item.id} className="card py-1 border-black border-2 md:my-2 w-[100%] bg-white flex justify-center items-center gap-7 md:gap-4 rounded-xl"> 
                <div className="w-[24%] my-4 flex justify-start items-start ml-7">
                    <h1 className="text-2xl md:text-[19px] font-bold text-center">
                        {item.title}
                    </h1>
                </div>

                <div className="explien md:text-[15px] w-[70%] md:w-[50%] mr-10 border-b-2 border-b-black">
                    {item.explain}
                </div>
                <input type="checkbox"/>
                <button onClick={() => Delete(item.id)} className="delete w-[10%] md:w-[60px] md:mx-3 md:p-0 md:h-[40px] md:rounded-full md:text-[25px] rounded-xl text-[30px] font-bold mx-4 flex justify-center items-center">
                    ×
                </button>
                </div>
            )
            })}
      </div>
    )
}