import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import ComicCard from "./components/ComicCard";

function App() {
  const [comics, setComics] = useState([]);
  const [searchInput, setSearchInput] = useState("Iron Man");
  useEffect(() => {
    async function fetchComics() {
      try {
        const result = await axios.get(
          `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchInput}&apikey=949e932fb1cb14d1471ca2b75d6c6221`
        );
        console.log(result.data.data.results);
        const comicsArray = result.data.data.results;
        setComics(comicsArray);
      } catch (error) {
        console.log(error);
      }
    }
    fetchComics();
  }, [searchInput]);
  console.log("here are our", comics);

  return (
    <>
      <Navbar setSearchInput={setSearchInput} />
      <div style={styles.cardContainer}>
        {comics.map((comic, index) => (
          <ComicCard key={index} comic={comic} />
        ))}
      </div>
    </>
  );
}

const styles = {
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  card: {
    margin: "20px",
  },
};
export default App;
