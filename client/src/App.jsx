import "./App.css";
import Images from "./components/Images";
import Navbar from "./components/Navbar";
import GetImages from "./API/Remote/api";
import { useState } from "react";

function App() {
  const [images, setImages] = useState(null);
  const [userSearchTerm, setUserSearchTerm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getImages = await GetImages(userSearchTerm);
    setImages(getImages);
    console.log(images);
  };

  const handleInputChange = (e) => {
    setUserSearchTerm(e.target.value);
    console.log(userSearchTerm);
  };

  return (
    <>
      <Navbar handleSubmit={handleSubmit} handleInputChange={handleInputChange}/>
      <Images
        images={images}
      />
    </>
  );
}

export default App;
