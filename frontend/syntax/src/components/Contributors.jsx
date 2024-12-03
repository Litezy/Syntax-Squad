

import { GiMedal, GiStarMedal } from "react-icons/gi";
import { IoIosMedal } from "react-icons/io";
import { TbMedal2 } from "react-icons/tb";
import { PiMedalMilitaryFill, PiMedalFill } from "react-icons/pi";

function Contributors() {
  const contributorsAwards = [
    { title: "Expert Contributor", Symbol: <GiMedal /> },
    { title: "Dedicated Helper", Symbol: <GiStarMedal /> },
    { title: "Proactive Poster", Symbol: <IoIosMedal /> },
    { title: "Inquisitive Learner", Symbol: <TbMedal2 /> },
    { title: "Helpful Responder", Symbol: <PiMedalMilitaryFill /> },
    { title: "Balanced Contributor", Symbol: <PiMedalFill /> },
  ];

  return (
    <div className="flex flex-wrap p-6 bg-primary mt-20">
      {/* Left Side */}
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-3xl font-bold mb-4 text-white">Be a Top Contributor on Edu Connect</h1>
        <p className="text-white mb-4">
          Stand out as a leader by sharing your knowledge and helping fellow students succeed. 
          Earn badges, points, and recognition as a top contributor in the Edu Connect community!
        </p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-Grotesk">
          Be a Top Contributor
        </button>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 p-4">
     
        <div className="grid grid-cols-2 gap-4">
          {contributorsAwards.map((award, index) => (
            <div
              key={index}
              className="flex items-center p-4 border rounded-lg shadow hover:shadow-lg"
            >
              <div className="text-4xl text-blue-500 mr-4">{award.Symbol}</div>
              <h3 className="text-lg font-medium text-white">{award.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contributors;
