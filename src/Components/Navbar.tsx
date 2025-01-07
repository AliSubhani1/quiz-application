import React from "react";
import MainLogo from '../Assets/Images/MainLogo.svg'
import UserIcon from '../Assets/Images/UserIcon.svg'

const Navbar = () => {
    return(
      <div className="bg-white-0 w-full py-4 border-b border-gray-1 shadow-md">
        <div className="w-[95%] mx-auto flex justify-between">
        <img className="w-40" src={MainLogo} alt="main logo" />
        <div className="flex gap-4 items-center">
            <img className="w-10 bg-gray-0 p-2 rounded-full" src={UserIcon} alt="" />
            <p>Quiz Taker</p>
        </div>
        </div>

      </div>  
    )
}

export default Navbar;