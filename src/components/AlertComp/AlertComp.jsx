"use client"
const AlertComp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [perm, setPerm] = useState({perm: 'cancel'})
  const handlePermission = () => {
    setPerm({perm: 'ok'})
    setIsOpen(!isOpen)
  };
  const cancel = () =>{
    setIsOpen(!isOpen)
    setPerm({perm: 'cancle'})
  }

  return (
    <div className="fixed top-1/4 left-1/4">
   {isOpen &&   
   <div className="modal-box relative flex flex-col w-full min-w-96 h-auto min-h-28 shadow-white shadow">
    <button className="absolute top-2 right-2" onClick={()=> cancel()}><IoMdClose size='20' /></button>
    <h2 className="text-xl font-bold">Are you sure?</h2>
    <p className="text-sm">This item will deleted permanently</p>
    <div className="flex gap-2 mt-5 self-end">
    <button className="btn btn-neutral" onClick={()=> cancel()}>Cancel</button>
    <button className="btn btn-error" onClick={()=> handlePermission()}>Delete</button>
    </div>
   </div>
      }
    </div>
  )
}
export default AlertComp