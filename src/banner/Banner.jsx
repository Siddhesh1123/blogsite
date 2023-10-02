import React from 'react'
import { Box, Typography, styled } from '@mui/material'


const Image = styled(Box)`
background:url(https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&w=1000&q=80 )  #000 ;
width:100%;
background-size: cover;
height:40vh;
background-repeat: no-repeat;
background-position: center;

display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
`
const Heading = styled(Typography)`
font-size:80px;
color:#fff;
font-family: cursive;
`
const SubHeading = styled(Typography)`
font-size:30px;
color:#fff;
font-family: cursive;
`

export const Banner = () => {
  return (
      <Image>
          <Heading>BLOGS</Heading>
          <SubHeading>KNOWLEDGE WAVE</SubHeading>
    </Image>
  )
}
