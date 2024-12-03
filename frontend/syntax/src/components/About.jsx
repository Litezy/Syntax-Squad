
import { IoBookSharp } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { TbMathSymbols } from "react-icons/tb";
import { HiUsers, HiMiniBuildingLibrary, HiMiniBeaker, HiComputerDesktop } from "react-icons/hi2";
import { GiEternalLove, GiGraduateCap, GiWorld } from "react-icons/gi";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaHandPaper, FaMap } from "react-icons/fa";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
import { VscLaw } from "react-icons/vsc";
import { LuFileStack } from "react-icons/lu";

function About() {
  const learningMaterial = [
    { icon: <IoBookSharp />, title: "All Subjects" },
    { icon: <ImBooks />, title: "English" },
    { icon: <TbMathSymbols />, title: "Mathematics" },
    { icon: <HiUsers />, title: "Social Studies" },
    { icon: <HiMiniBuildingLibrary />, title: "History" },
    { icon: <GiEternalLove />, title: "Biology" },
    { icon: <AiFillThunderbolt />, title: "Physics" },
    { icon: <HiMiniBeaker />, title: "Chemistry" },
    { icon: <HiComputerDesktop />, title: "Computer Science" },
    { icon: <FaHandPaper />, title: "Art" },
    { icon: <RiMoneyEuroCircleFill />, title: "Accounting" },
    { icon: <GiGraduateCap />, title: "French" },
    { icon: <FaMap />, title: "Linguistic" },
    { icon: <VscLaw />, title: "Government" },
    { icon: <LuFileStack />, title: "Literature" },
    { icon: <GiWorld />, title: "Geography" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-center text-3xl text-background font-bold mb-6">
        Unlock The Power of Learning<br /> Through Shared Knowledge
      </h1>
      <div className="grid p-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {learningMaterial.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-3 border rounded-lg shadow hover:shadow-lg"
          >
            <div className="text-4xl text-blue-500">{item.icon}</div>
            <h2 className="mt-2 text-lg font-medium">{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
