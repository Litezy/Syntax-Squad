
import './App.css'
import Register from './components/register'
import Login from './components/Login'
import './Global.scss'
import { Route, Routes } from 'react-router-dom'
import Authentication from './components/Authentication'
import Home from './Pages/Home'


function App() {


  return (
    <div>
      <Routes>
        <Route path='/'  element={<Register/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Authentication" element={<Authentication/>}/>
        <Route path ="/Home" element={<Home/>}/>



      </Routes>
    </div>
  )
}

export default App
