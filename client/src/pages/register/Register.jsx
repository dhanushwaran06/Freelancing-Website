import React, {useEffect, useState} from 'react'
import SignUpStyles from './SignUp.module.css';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const skillSet = [
    'WEB DEVELOPMENT', 
    'MARKETING',
    'SOFTWARE DDEVELOPMENT',
    'VIDEO EDITING',
    'AI ARTIST'
  ];

function getStyles(skillSet, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(skillSet) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

function register({ setTheUser }) {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [skills, setSkills] = React.useState([]);
    const [isValid, setIsValid] = useState(true);

    const [user, setUser] = useState({});
    const [userList, setUserList] = useState([]);

    useEffect(() => {
      getUsers();
    }, [])

    const getUsers = () => {
      fetch("http://localhost:4000/users")
      .then((response) => {
        const res = response.json();
        return res;
      })
      .then((users) => {
        let usersList = users;
        setUserList(usersList);
      });
    }


    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setSkills(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    }; 

    useEffect(() =>{
      setUser({
        ...user,
        skills: skillSet
      })
    }, [skillSet]);
    
    const onNameChange = (name) => {
      setUser({
        ...user, 
        name: name
      })
    }

    const onMobileChange = (mobile) => {
      setUser({
        ...user, 
        mobile: mobile
      })
    }

    const userExists = (email) => {
        console.log('___',userList)
        const emails = _.reduce(userList, (acc, Myuser) => {
          acc.push(_.get(Myuser, 'email'))
          return acc;
        }, [])
        console.log(emails)
        if(_.includes(emails, email)){
          setIsValid(false);
          return true;
        } else {
          console.log(email);
          setIsValid(true);
          return false;
        }
    }
    
    const onEmailChange = (email) => {
      if(!userExists(email)){
      setUser({
        ...user, 
        email : email
      }) 
    }
  }

    const onPasswordChange = (password) => {
      setUser({
        ...user, 
        password: password
      })
    }
    const onRegister = () =>{
      fetch("http://localhost:4000/register",{
      mode:"cors",
      method : "post",
      headers : { 'Content-Type' : 'application/json', 'Access-Control-Allow-Origin':'*'},
      body : JSON.stringify({
        email : user.email,
        password : user.password,
        mobile: user.mobile,
        name: user.name,
        skills: user.skills
      })
    })
    .then(response=>{
      response.json()
    })
    .then(() =>{
      setTheUser(user);
    })
    }

    const handleClickShowPassword = () =>{
        setShowPassword(!showPassword);
    }
  return (
    <div className={SignUpStyles.container}>
    <div className={SignUpStyles.mainContainer}>
        <h1>Sign up</h1>
        <p>start your journy</p>
        <TextField id="filled-basic" label="Name" variant="filled" size='small' color='success'
        style={{width: '200px'}} onChange={(e) => onNameChange(e.target.value)}
        />
        <TextField id="filled-basic" label="Mobile" variant="filled" size='small' color='success'
        style={{width: '200px'}} onChange={(e) => onMobileChange(e.target.value)}/>
        <TextField id="filled-basic" label="Email" variant="filled" size='small' color='success'
        style={{width: '200px'}} onChange={(e) => onEmailChange(e.target.value)}
        error={!isValid} helperText={!isValid ? "Email Already Exists" : ''} 
        />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password" color='success'>Password</InputLabel>
          <FilledInput
          style={{width: '200px'}}
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            size='small'
            color='success'
            onChange={(e)=> onPasswordChange(e.target.value)}
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
        <Select
          labelId="demo-multiple-chip-label"
          color='success'
          id="demo-multiple-chip"
          multiple
          value={skills}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {skillSet.map((skill) => (
            <MenuItem
              key={skill}
              value={skill}
              style={getStyles(skill, skills, theme)}
            >
              {skill}
            </MenuItem>
          ))}
        </Select>
        <div>
            <p>Already have an account?</p>
            <Link to="/login">
            <a style={{color: 'green', cursor: 'pointer'}}>Log in</a>
            </Link>
        </div>
        <Link to="/">
            <Button variant="contained" color='success' disabled={!isValid}
            onClick={() => onRegister()}
            >Sign up</Button>
        </Link>
    </div>
    </div>
  )
}

export default register