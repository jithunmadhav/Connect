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



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Passwordreset(props) {
  const [err, seterr] = React.useState('')
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get('password').trim() && data.get('confirmpassword').trim()){
        if(data.get('password')===data.get('confirmpassword')){
            let email=props.data.email,password=data.get('password');
            axios.post('/resetPassword',{email,password}).then((response)=>{
              if(!response.data.err){
                dispatch({type:'refresh'})
                navigate('/login')
              }
            })
        }else{
            seterr('Password are not same')
        }
    }else{
        seterr('All fields are required')
    }
  };


  return (
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
          <Typography sx={{mt:4}} component="h1" variant="h5">
            Reset password
          </Typography>
          <p style={{ height:'30px', color:'red' , fontFamily:'monospace', fontSize:'18px' }}>{err}</p>
          <Box component="form" onSubmit={handleSubmit} noValidate>
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
              label="confirm password"
              type="password"
              id="confirmpassword"
              autoComplete="current-password"
              aria-required
            />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}