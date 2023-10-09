import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import ForgotPassword from './Components/Forgotpassword/Forgotpassword';
import Passwordreset from './Components/PasswordReset/Passwordreset';
import Home from './Components/Home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from './axios';
function App() {
  const {user,refresh} = useSelector(state => state)
  axios.defaults.withCredentials = true;
const dispatch = useDispatch()
  useEffect(() => {
    axios.get('/auth').then((response)=>{
      dispatch({ type: 'user', payload: { login: response.data.logged, details: response.data.details } });
      console.log('USER :',user);
    }).catch((error)=>{
      console.log(error);
    })
  }, [refresh, dispatch])
  return (
    <>
        <Router>
        <Routes>
        {!user.login && (
            <>
              <Route path='/login' element={<Login/>} /> 
              <Route path='/signup' element={<Signup/>} />
              <Route path='/forgotpassword' element={<ForgotPassword/>} />
              <Route path='/resetpassword' element={<Passwordreset/>} />     
               <Route path='/' element={<Navigate to={'/login'}/>}/>
               {/* <Route path='/' element={<Home/>}/> */}

            </>
          )}
          {user.login && (
            <>
              <Route path='/login' element={<Navigate to={'/'}/>} /> 
              <Route path='/signup' element={<Navigate to={'/'}/>} />
              <Route path='/forgotpassword' element={<Navigate to={'/'}/>} />
              <Route path='/resetpassword' element={<Navigate to={'/'}/>}/>  
             <Route path='/' element={<Home/>}/>
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
