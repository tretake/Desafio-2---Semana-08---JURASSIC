import React from 'react'

const AppPopUp = ( {handleAppPopUp} ) => {
  return (
    <div className='w-full bg-[#00000080] rounded-2xl md:px-5 md:py-4  px-3 py-2  absolute bottom-3 lg:hidden'>
            <div className='flex'> 
              <img className='size-[22px] md:size-[34px]' src="./images/logo.png" alt="" />
              <h1 className=' ml-2 md:text-lg font-bold text-white'>Trabalhar no aplicativo</h1>
            </div>
            <p className='text-white text-sm my-2' >Adicione ideias, notas e faça um plano de organização de onde estiver. </p>
            
            <div className='flex justify-between font-medium text-sm '>
                <button onClick={handleAppPopUp} className='bg-white px-3 py-1 rounded-xl' >Agora não</button>
                <button onClick={handleAppPopUp}  className='text-white bg-[#4F46E5] px-3 py-1 rounded-xl' >Usar o aplicativo</button>
            </div>
          </div> 
  )
}

export default AppPopUp
