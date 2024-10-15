import NavBottom from "@/components/NavBottom/NavBottom"
import './dash.css'

const layout = async({children, params}) => {

  const {storeid} = params
  return (
    <div className="dashlayout w-full h-full min-h-screen flex pl-9">
      <NavBottom storeid={`${storeid}` || null} />
      {children}
    </div>
  )
}
export default layout