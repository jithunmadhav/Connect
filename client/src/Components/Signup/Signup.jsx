import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { useDispatch } from 'react-redux';
import Otpverification from '../Otpverification/Otpverification';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/dashboard">
        URLencrypto
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Signup() {
    const dispatch = useDispatch()
  const [err, seterr] = React.useState('')
  const [data, setdata] = React.useState('')
  const [openOtp, setOpenOtp] = React.useState(false)
  const navigate=useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get('email').trim() && data.get('password').trim() && data.get('name').trim() && data.get('confirmpassword').trim()){
        if(data.get('email').includes('@gmail.com')){
            if(data.get('password')===data.get('confirmpassword')){
                let email=data.get('email'),name=data.get('name'),password=data.get('password'),confirmpassword=data.get('confirmpassword')
                let Data={
                  email:email,name:name,password:password,type:'signup'
                }
                setdata(Data)
                axios.post('/signup',{email,name,password,confirmpassword}).then((response)=>{
              if(!response.data.err){
                setOpenOtp(true)
              }else{
                seterr(response.data.message)
              }
              }).catch((error)=>{
                console.log(error);
              })
            }else{
                seterr('Password entered are not same')
            }
        }else{
            seterr('Invalid email format')
        }
    }else{
        seterr('All fields are required')
    }
  };

  return (
    openOtp ? <Otpverification data={{data}}/> :
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
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
             <TextField
              margin="normal"
              required
              type='text'
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              aria-required
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              aria-required
            />
              <TextField
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
              aria-required
            />
          
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid style={{ flexDirection:'column', alignItems:'center' }} container>
              <Grid item>
                <p onClick={()=>navigate('/login')} style={{ color:'#1565c0',cursor:'pointer' }}>Already have account ? sign in</p>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}