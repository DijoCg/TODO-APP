import Signup from './pages/Singup'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Navbar from './pages/Navbar'


function App() {
  

  return (
    <BrowserRouter>
     <Navbar />
    <Routes>
      <Route path='/' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
    </Routes>

    
    </BrowserRouter>
  )
}

export default App
