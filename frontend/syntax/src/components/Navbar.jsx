
function Navbar() {
  return (
    <div className="bg-white shadow-md fixed w-full">
        <div className="flex justify-between items-center p-4 ">
    <div>
        <h1 className="font-bold">EduConnect</h1>
        
    </div>  
    <div>
        <ul className="text-primary flex gap-10 cursor-pointer">
            <li>Home</li>
            <li>Who We Are</li>
            <li>Contact Us</li>
        </ul>
    </div>
    <div className="">
        <button className="bg-primary h-[45px] w-[120px] text-white rounded-md mr-3">Login</button>
        <button className=" border-2 h-[45px] w-[120px] border-solid border-primary rounded-md">Sign up</button>
    </div>
    </div>

    </div>
  )
}

export default Navbar
