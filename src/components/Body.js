import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

function Body() {
  return (
    <div className="grid grid-flow-col">
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default Body
