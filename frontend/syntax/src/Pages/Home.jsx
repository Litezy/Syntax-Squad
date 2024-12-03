import About from "../components/About"
import AboutEdu from "../components/AboutEdu"
import Contributors from "../components/Contributors"
import Herosection from "../components/Herosection"
import Navbar from "../components/Navbar"

function Home() {
  return (
    <div>
      <Navbar/>
      <Herosection/>
      <About/>
      <AboutEdu/>
      <Contributors/>
    </div>
  )
}

export default Home
