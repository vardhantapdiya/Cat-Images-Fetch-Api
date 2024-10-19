import React, { useState, useEffect } from 'react';
import './App.css'

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(null);
  const [pg, setPage] = useState(10); // Default to page 10

  const fetchData = async (pg) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=5&page=${pg}&order=Desc`
      );
      const data = await response.json();
      setImages((prevImages) => [...prevImages, ...data]);
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pg);
  }, [pg]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 10) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <nav className='navbar'>
        <h2>Some Cat Images to Brighten Your Day</h2>
      </nav>
      {loading && <p>Loading...</p>}
      {err && <p>{err}</p>}
      
      <div className="column">
        {images.map((image, index) => (
          <div key={index} className="card">
            <img src={image.url} alt="CatImg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
