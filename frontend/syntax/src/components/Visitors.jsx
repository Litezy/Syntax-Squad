import { IoStar } from "react-icons/io5";
import image1 from "./../assets/images/profile11.jpg"
import image3 from "./../assets/images/profile13.jpg"
import image4 from "./../assets/images/profile14.jpg"
import image5 from "./../assets/images/profile15.jpg"

function Visitors() {
  return (
    <div className="mt-10 ">
        <div className="flex ml-5">
            <img src={image1} className="w-[47px] h-[47px] rounded-full object-cover "/>
            <img src={image5} className="w-[47px] h-[47px] rounded-full object-cover"/>
            <img src={image3} className="w-[47px] h-[47px] rounded-full object-cover"/>
            <img src={image4} className="w-[47px] h-[47px] rounded-full object-cover"/>




        </div>
      <div className="flex gap-2 justify-center">
      <IoStar size={30} color="#FF9800" />
      <IoStar size={30} color="#FF9800" />
      <IoStar size={30} color="#FF9800" />
      <IoStar size={30} color="#FF9800" />
      <IoStar size={30} color="#FF9800" />
      </div>
      <div>
        <p className="text-center font-Grotesk text-white">From 200+ Reviews</p>
        <p className="text-white font-Grotesk">Trusted by over 2k+ Students</p>

      </div>
    </div>
  )
}

export default Visitors
