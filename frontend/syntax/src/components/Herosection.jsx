import Visitors from './visitors'
import user1 from './../assets/images/profile11.jpg'
import user2 from './../assets/images/profile15.jpg'
import user3 from './../assets/images/profile13.jpg'
import user4 from './../assets/images/profile14.jpg'




function Herosection() {


    const posts = [{


        image: user1,
        user: "Chinedu Emeka",
        grade: "Grade 12",
        school: "Liivha Combined School",
        time: "12hrs",
        subject: "Mathematics",
        question: "What is Algebra?",
        answer: "In a gala with 576 people, if the ratio of staff to guests is 3 to 5, then there were 360 guests. " ,
    },
    {
    
    
        image: user2,
        user: "Kalistos Yawa",
        grade: "Grade 11",
        school: "Mbilwi Secondary School",
        time: "5hrs",
        subject: "English",
        question: "What is verb?",
        answer: "a word used to describe an action, state, or occurrence, and forming the main part of the predicate of a sentence, such as hear, become, happen." ,
    },
    {
    
    
        image: user3,
        user: "Boma Wike",
        grade: "Grade 10",
        school: "Marude Secondary School",
        time: "10hrs",
        subject: "Geography",
        question: "What is Rain?",
        answer: "is a type of precipitation that occurs when water droplets fall from clouds to the ground." ,
    },
    {
    
    
        image: user4,
        user: "Philo Wike",
        grade: "Grade 10",
        school: "Marude Secondary School",
        time: "10hrs",
        subject: "Accounting",
        question: "What is Accounting?",
        answer: "the process of recording financial transactions pertaining to a business." ,
    },
    
    
    
    
    ]
    return (
      <div className="bg-background h-[120vh]">
        <div className="flex items-center justify-center flex-col">
          <div>
            <div className="mt-[10rem]">
              <h1 className="font-Grotesk text-4xl font-bold text-white">
                Ask. Learn. Grow Together.
              </h1>
              <p className="text-white mt-5">
                A platform for African students to ask questions and share knowledge.
              </p>
              <p className="mt-3 text-white text-center">
                Create a free account and get access to free educational
                <br />
                resources from peers.
              </p>
            </div>
            <div className="mt-5">
              <button className="bg-primary h-[45px] w-[180px] text-white rounded-md mr-3">
                Get Started
              </button>
              <button className="border-2 h-[45px] w-[180px] border-solid border-primary rounded-md text-white">
                Try Demo
              </button>
            </div>
          </div>
  
          <div className="mr-[80px]">
            <Visitors />
          </div>
  
          {/* Mapping posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-20 m-20">
            {posts.map((post, index) => (
              <div
                key={index}
                className="bg-[#E8F1FB] p-5 rounded-md shadow-md text-black"
              >
                <div className="flex items-center mb-4 ">
                  <img
                    src={post.image}
                    alt={`${post.user}'s profile`}
                    className="w-[50px] h-[50px] object-cover rounded-full mr-4"
                  />
                  <div>
                    <h2 className="font-bold text-primary">{post.user}</h2>
                  
                    <p className="text-xs text-primary">{post.grade} .{post.school} .{post.time} <span className='text-green-600'>.{post.subject}</span></p>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-800  text-primary">{post.question}</p>
                  <p className="text-gray-800 text-primary">{post.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default Herosection;
  

