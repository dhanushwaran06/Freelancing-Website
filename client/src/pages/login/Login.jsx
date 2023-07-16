import React, {useState} from 'react'
import LoginStyles from './Login.module.css';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Login({ setTheUser }) {
    const [userCredentials, setUserCredentials] = useState({});
    const [showPassword, setShowPassword] = useState(false); 
    
    const onEmailChange = (email) =>{
      setUserCredentials({ ...userCredentials, email: email});
    }

    const onPasswordChange = (password) =>{
      setUserCredentials({ ...userCredentials, password: password});
    }

    const handleClickShowPassword = () =>{
        setShowPassword(!showPassword);
    }

    const onLogin = () => {
      fetch("http://localhost:4000/login",{
      mode:"cors",
      method : "post",
      headers : { 'Content-Type' : 'application/json', 'Access-Control-Allow-Origin':'*'},
      body : JSON.stringify({
        email : userCredentials.email,
        password : userCredentials.password
      })
    })
    .then(response=>{
      const r =  response.json()
      return r
    })
    .then(user =>{
      setTheUser(user);
    })
    }
  return (
    <div className={LoginStyles.container}>
        <div className={LoginStyles.mainContainer}>
            <h1>Log in</h1>
            <p>start your journy</p>
            <TextField id="filled-basic" label="Email" variant="filled" size='small' color='success'
            onChange={(event) => onEmailChange(event.target.value)}
        style={{width: '200px'}}/>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password" color='success'>Password</InputLabel>
          <FilledInput
          onChange={(event) => onPasswordChange(event.target.value)}
          style={{width: '200px'}}
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            size='small'
            color='success'
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <div>
            <p>Don't have an account?</p>
            <Link to="/register">
            <a style={{color: 'green', cursor: 'pointer'}}>Sign up</a>
            </Link>
        </div>
        
        <Link to="/">
        <Button variant="contained" color='success' onClick={() =>{ 
          onLogin()
          }
          }>Log in</Button>
          </Link>
        </div>
    </div>
  )
}

export default Login