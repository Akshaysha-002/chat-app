import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import ChatContainer from "../componets/ChatContainer";
import RightSidevar from "../componets/RightSidevar";
import Sidebar from "../componets/Sidebar";






const HomePage = () => {
  const { selectedUser } = useContext(ChatContext)


  return (
    <div className="border w-full h-screen sm:px-[15] sm:py-[5%]">
      <div className={`backdrop-blur-xl border-2 border-y-gray-600 rounded-2xl
        overflow-hidden h-[100%] grid grid-cols-1 relative ${selectedUser ?
          `md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]` : `md:grid-cols-2`}
        `}>

        <Sidebar />
        <ChatContainer />
        <RightSidevar />


      </div>
    </div>
  )
}
export default HomePage;