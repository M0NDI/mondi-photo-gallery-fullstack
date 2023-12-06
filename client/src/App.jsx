import "./App.css";
import Images from "./components/Images";
import Navbar from "./components/Navbar";
import GetImages from "./API/Remote/api";
import { useState, useEffect } from "react";
import ImageHoverOptions from "./components/ImageHoverOptions";

function App() {
  const [images, setImages] = useState([]);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImages([])
    const getImages = await GetImages(userSearchTerm);
    setImages(getImages);
  };

  const handleInputChange = (e) => {
    setUserSearchTerm(e.target.value);
  };

  const getNextPage = async () => {
    if (loading) return;
  
    setLoading(true);
  
    try {
      const nextPageResults = await GetImages(userSearchTerm, currentPage);
  
      if (nextPageResults.length > 0) {
        setImages((prevImages) => [...prevImages, ...nextPageResults]);
  
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.error('Error fetching next page:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (window.scrollY / pageHeight >= 0.75) {
        getNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, loading]);

  return (
    <div className="app t-bg-zinc-200">
      <Navbar handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
      <Images images={images} loading={loading}/>
    </div>
  );
}

export default App;