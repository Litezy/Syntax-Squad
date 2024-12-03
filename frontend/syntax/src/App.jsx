
import './App.css'
import Register from './components/register'
import Login from './components/Login'
import './Global.scss'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Authentication from './components/Authentication'


function App() {


  return (
    <div>
     <BrowserRouter>
     <Routes>
        <Route path='/'  element={<Register/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Authentication" element={<Authentication/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
