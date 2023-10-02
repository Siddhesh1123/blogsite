import "./App.css";
import DataProvider from "./context/DataProvider";
import { BrowserRouter, Routes, Route,} from "react-router-dom";


//components
import { Login } from "./Components/accounts/Login";
import { Home } from "./Components/Home/Home";
import { CreatePost } from "./Components/createpost/CreatePost";





function App() {
 
  

  return (
    <DataProvider>
      <BrowserRouter>
        
        <div style={{ marginTop: "90px" }}>
          <Routes>
            
            <Route path="/login" element={<Login  />} />
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreatePost />} />
            </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
