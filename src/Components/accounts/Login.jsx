import React from "react";
import { useState , useContext } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import logo from "../../assets/images/Logo.svg";
import '../../assets/styles/login.css'
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 500px;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  padding: 50px;
  border-radius: 10px;
background-color: #FF3CAC;
background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);



`;
const Image = styled("img")({
  width: 400,
  margin: "auto",
  display: "flex",
  padding: "50px 0px 0px",
});
const Wrapper = styled(Box)`
  padding : 25px 35px ; 
  display : flex ;
  flex 1;
  flex-direction : column;
  & > div , & > button , & > p{
    margin-top:20px;
  }
`;
const LoginButton = styled(Button)`
  background: #784BA0;
  font-size: 20px;
  border-radius: 10px;
  padding: 20px;
  color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;
const SignupButton = styled(Button)`
  background: #fff;
  font-size: 20px;
  border-radius: 10px;
  padding: 20px;
  color: #2874f0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;
const Inputfield = styled(TextField)`
  margin-bottom: 20px;
  

`;
const Error = styled(Typography)`
  font-size: 20px;
  color:#ff6161;
  line-height:0;
  margin-top:10px;
  font-weight:600;
`

//label styles
const labelstyles = {
  color: 'white',
  fontSize: '19px',
  fontWeight: 'bold',
};


//for backend


const signupIntialValues = {
  name: '',
  username: '',
  password: ''
}

const loginIntialValues = {
  username: '',
  password:''
}

export const Login = () => {
  const [account, toggleaccount] = useState("login");
  const [signup, setsignup] = useState(signupIntialValues);
  const [login, setlogin] = useState(loginIntialValues);
  const [error, setError] = useState('');

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const togglesignup = () => {
    account === "login" ? toggleaccount("signup") : toggleaccount("login");
  };
  const onInputChange = (e) => {
  setsignup({...signup , [e.target.name] : e.target.value})
  }
  
  const signupUser = async() => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setError('');
      setsignup(signupIntialValues);
      toggleaccount('login');

    }
    else {
      setError('something went wrong')
    }
  }

  //login part

  const onValueChange = (e) => {
    setlogin({...login , [e.target.name] : e.target.value})
  }

  const loginUser = async() => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      setError('');
      
      sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
      sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
      setAccount({ username: response.data.username, name: response.data.name })
      
      navigate('/');
    } else {
      setError('Something went wrong');
    }
  }
  return (
    <Component>
      <Box className="content">
        <Image src={logo} alt="no image" className="image"/>
        {account === "login" ? (
          <Wrapper>
            <Inputfield variant="standard" label="Enter Username" value={login.username} name="username" onChange={(e) => onValueChange(e)} InputLabelProps={{style:labelstyles}} />
            <Inputfield variant="standard" label="Enter Password" value={login.password} name="password" onChange={(e) => onValueChange(e)} InputLabelProps={{ style: labelstyles }} />
            
            {error && <Error>{error }</Error>}  
            <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
            <Typography
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: "20px",
                marginTop: "30px",
              }}
            >
              OR
            </Typography>
            <SignupButton variant="text" onClick={() => togglesignup()}>
              Create an Account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <Inputfield variant="standard" label="Enter Name" name="name" onChange={(e) => onInputChange(e)} InputLabelProps={{style:labelstyles}}/>
            <Inputfield variant="standard" label="Enter Username" name="username" onChange={(e) => onInputChange(e)} InputLabelProps={{style:labelstyles}}/>
            <Inputfield variant="standard" label="Enter Password" name="password" onChange={(e) => onInputChange(e)} InputLabelProps={{style:labelstyles}}/>
            
              {error && <Error>{error }</Error>}  
            <SignupButton onClick={() => signupUser()}>Sign up</SignupButton>
            <Typography
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: "20px",
                marginTop: "30px",
              }}
            >
              OR
            </Typography>
            <LoginButton variant="contained" onClick={() => togglesignup()}>
              Already Have an Account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};
