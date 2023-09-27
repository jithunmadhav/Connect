import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockResetTwoToneIcon from '@mui/icons-material/LockResetTwoTone';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import Otpverification from '../Otpverification/Otpverification';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const [err, seterr] = React.useState('')
  const [openOtp, setopenOtp] = React.useState(false)
  const [data, setdata] = React.useState('')


  const navigate=useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get('email').trim()){
      if(data.get('email').includes('@gmail.com')){
        let Data={
          email:data.get('email'),
          type:'forgot'
        }
        setdata(Data)
        let email=data.get('email')
          axios.post('/forgotPassword',{email}).then((response)=>{
            if(!response.data.err){
              setopenOtp(true)
            }
          })
        }else{
            seterr('Invalid email format')
        }
    }else{
        seterr('All fields are required')
    }
  };
  const showSignup=()=>{
    navigate('/login')
  }

  return (
    openOtp ? <Otpverification data={{data}} /> :
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
            Forgot password
          </Typography>
          <p style={{ height:'30px', color:'red' , fontFamily:'monospace', fontSize:'18px' }}>{err}</p>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              type='email'
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              aria-required
            />
          
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Continue
            </Button>
            <Grid style={{ flexDirection:'column', alignItems:'center' }} container>
              
              <Grid item>
                <p style={{ color:'#1565c0',cursor:'pointer' }} onClick={showSignup}>{"Sign in"} </p>
                
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}