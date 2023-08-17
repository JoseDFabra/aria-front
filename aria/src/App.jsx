import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { Navigation } from './components/navigate'
import { Crud } from './pages/crud'
import {Views} from './pages/views'
//taskpage
function App() {

  return (
    <BrowserRouter>

      <Navigation/>
      <Routes>
        <Route path='/' element={<Navigate to='/crud'/>} />
        <Route path='/crud' element={<Crud/>} />  
        <Route path='/views' element={<Views/>} />  
      </Routes>
    </BrowserRouter>
  )
}

export default App
