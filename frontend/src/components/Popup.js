import React from 'react'

function Popup({open, children, onClose, removeUser}) {
  if(!open) return null
    return (
    <div>
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/[0.3] blur-3xl z-[100]'/>
            <div className='modal_custom fixed text-center top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 bg-white/[0.9] border-2 border-beige p-9 z-[100]'>
                <div className='container'>
                    <div>
                        <p>A jeni i/e sigurtë që dëshironi të çregjistroheni?</p>
                        <button className='shadow-lg px-4 py-2 uppercase rounded border text-sm mt-5 font-bold text-light-brown border-light-brown' onClick={removeUser}>Po!</button>   
                        <button className='shadow-lg px-4 py-2 uppercase rounded border text-sm mt-5 font-bold text-light-brown border-light-brown ml-3' onClick={onClose}>Jo!</button>   
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Popup
