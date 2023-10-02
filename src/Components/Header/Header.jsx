
import { AppBar, Toolbar, styled } from '@mui/material';
import { useState } from 'react';

import {Link} from 'react-router-dom';

const Component = styled(AppBar)`
background:#784BA0;
`
const Container = styled(Toolbar)`
justify-content: center;
& > a{
    padding:30px;
    color:#fff;
    text-decoration:none;
    font-size:25px;
    font-family: system-ui;
}
`


export const Header = () => {


  return (
      <Component>
          <Container>
              <Link to='/'>HOME</Link>
              <Link to='/about'>ABOUT US</Link>
              <Link to='/abit'>ABIT</Link>
              <Link to='/login' >LOGOUT</Link>
          </Container>
    </Component>
  )
}
