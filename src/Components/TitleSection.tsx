import React from "react";
import PuzzleIcon from '../Assets/Images/PuzzleIcon.svg'

type TitleProps = {
    heading: string;
}

const TitleSection = ({heading}: TitleProps) => {
    return(
        <div>
            <div className="pt-2 flex items-center space-x-2">
                <div className="bg-gray-2 rounded-full w-10 ml-4">
                    <img className="p-2" src={PuzzleIcon} alt="puzza icon" />
                </div>
                <p className="text-2xl font-semibold">{heading}</p>
            </div>
            <div className="border-t border-gray-3 my-4 pb-4 w-[95%] mx-auto"></div>
        </div>
    )
}
export default TitleSection;