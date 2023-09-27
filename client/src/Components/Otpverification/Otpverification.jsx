import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import OTPInput from 'otp-input-react';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockResetTwoToneIcon from '@mui/icons-material/LockResetTwoTone';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Otpverification.css';
import axios from '../../axios';
import { useDispatch } from 'react-redux';
import Passwordreset from '../PasswordReset/Passwordreset';




// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Otpverification(props) {
  const dispatch = useDispatch()
      const [OTP, setOTP] = React.useState('');
      const [timer, setTimer] = useState(60);
      const [resendAttempts, setResendAttempts] = useState(0);
      const [openReset, setopenReset] = useState(false)
  const [err, seterr] = React.useState('')
  const navigate=useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    if(OTP.trim()){
      if(props.data.data.type==='signup'){
        axios.post('/verifySignup',{OTP,...props.data.data}).then((response)=>{
          if(!response.data.err){
           dispatch({type:'refresh'})
           navigate('/')
          }else{
            seterr(response.data.message)
          }
        })
      }else{
        axios.post('/verifyResetOtp',{OTP,...props.data.data}).then((response)=>{
          if(!response.data.err){
            setopenReset(true)
          }else{
            seterr(response.data.message)
          }
        })
      }
    }else{
        seterr('otp is required')
    }
  };
  React.useEffect(() => {
    let intervalId;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  const handleResendOTP = () => {
    if (resendAttempts < 3) {
      setResendAttempts((prevAttempts) => prevAttempts + 1);
      setTimer(60);
      axios.post('/resendOtp', { ...props.data.data }).then((response) => {
        console.log(response.data);
      });
    }
  };

  return (
    openReset ? <Passwordreset data={{...props.data.data}} /> :
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockResetTwoToneIcon />
          </Avatar>
          <Typography sx={{mt:5}} component="h1" variant="h5">
          Please enter the OTP.
          </Typography>
          <p style={{ height:'30px', color:'red' , fontFamily:'monospace', fontSize:'18px' }}>{err}</p>
          <Box component="form" onSubmit={handleSubmit} noValidate>
          <OTPInput
                value={OTP}
                onChange={setOTP}
                autoFocus
                OTPLength={5}
                otpType="number"
                disabled={false}
                secure
                className="textfield"
              />
              
          
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 2 }}
            >
              Continue
            </Button>
            {timer === 0 && resendAttempts < 3 && (
                // <button
                //   type="submit"
                //   className="resend-btn"
                //   style={{ color: 'white' }}
                //   onClick={handleResendOTP}
                // >
                //   Resend OTP
                // </button>
                <Button
                type="submit"
                
                onClick={handleResendOTP}
                variant="contained"
                sx={{ mt: 5, mb: 2,ml:12 }}
              >
                 Resend OTP
              </Button>
              )}
              {timer > 0 && (
                <p style={{ textAlign:'center' }} className="timer timer-style">Resend OTP in {timer} s</p>
              )}
              {resendAttempts >= 3 && (
                <p className="error-msg">Maximum resend attempts reached</p>
              )}
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

