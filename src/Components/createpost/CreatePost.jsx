import { useState , useEffect ,useContext } from "react";
import { Header } from "../Header/Header";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";
import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const Image = styled("img")`
  width: 100%;
  height: 50vh;
  objectfit: "cover";
`;
const Container = styled(Box)`
  margin: 90px 400px;
`;
const StyleFormControl = styled(FormControl)`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;
const InputText = styled(InputBase)`
  flex: 1;
  margin: 0px 40px;
  font-size: 30px;
`;

const Publish = styled(Button)`
  background: #784ba0;
  font-size: 18px;
  border-radius: 10px;
  padding: 20px 30px;
  color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;
const Textarea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  padding: 20px 0px 0px 20px;
  border-radius: 10px;
  font-size: 30px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  &:focus-visible {
    outline: none;
  }
`;
const intialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createDate: new Date(),
};

export const CreatePost = () => {
    const location = useLocation();
  
    const [post, setPost] = useState(intialPost);
    const [file, setFile] = useState('');
    

    const { account } = useContext(DataContext);
    
    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

        useEffect(() => {
          const getImage = async() => {
            if (file) {
              const data = new FormData();
              data.append("name", file.name);
              data.append("file", file);

              //API CALL
              const response = await API.uploadFile(data);
              console.log("1")
              post.picture = response.data;
              
            }
            
          }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
        }, [file])
  
    const handleOnchange = (e) => {
    setPost({...post, [e.target.name] : e.target.value})
    }
    


  return (
    <>
      <Header />
      <Container>
        <Image src={url}></Image>

        <StyleFormControl>
          <label htmlFor="fileInput">
            <Add color="action" sx={{ fontSize: 65 }} />
          </label>
          <input onChange={(e) => setFile(e.target.files[0])} type="file" id="fileInput" style={{ display: "none" }}  />
          <InputText onChange={(e)=> handleOnchange(e)} placeholder="Title" name='title' ></InputText>
          <Publish variant="contained">Publish</Publish>
        </StyleFormControl>
        <Textarea minRows={8} placeholder="Write Your Blog Here...." name='description' onChange={(e)=> handleOnchange(e)}/>
      </Container>
    </>
  );
};