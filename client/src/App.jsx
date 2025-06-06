import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { AppViews } from '../components/Views/AppViews.jsx'
import { Login } from '../components/Auth/Login.jsx'

export const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='*' element={<AppViews />} />
    </Routes>
  )
}