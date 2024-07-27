import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./card.css";
const Cards = () => {
  const [cards, setCards] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.results);
        const fetchDetails = data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        Promise.all(fetchDetails).then((detailedData) =>
          setCards(detailedData)
        );
      });
  }, []);

  // Filter cards based on name
  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchTitle.toLowerCase())
  );

  // Handle search input
  const handleSearchTitle = (event) => {
    setSearchTitle(event.target.value);
  };

  return (
    <div className="lg:px-32 px-auto my-10">
      <h3 className="text-center text-xl md:text-5xl font-medium">
        Explore the World of Pokémon! 🌟
      </h3>
      {/* search bar */}
      <div className="mb-10 flex flex-col md:flex-row justify-between my-5">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-base">Search Pokémon 🕵️‍♂️</h1>
          <p className="text-[#7C7C7C] text-sm">
            Total {filteredCards.length} Pokémon
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <CiSearch className="w-7 h-7" />
          <input
            type="text"
            placeholder="Pokémon name..."
            value={searchTitle}
            onChange={handleSearchTitle}
            className="outline-none text-[#7C7C7C]"
          />
        </div>
      </div>
      <div className="grid grid-rows-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-10 space-y-5">
        {/* cards */}
        {filteredCards.map((card, index) => (
          <div className="flip-card" key={index}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src={card.sprites.front_default}
                  alt={`image of ${card.name}`}
                />
              </div>
              <div className="flip-card-back">
                <h1 className="text-2xl capitalize mt-5 font-medium">
                  {card.name}
                </h1>
                <p>
                  Type:{" "}
                  <span className=" capitalize">
                    {card.types.map((type) => type.type.name).join(", ")}
                  </span>
                </p>
                <p>Height: {card.height}</p>
                <p>Weight: {card.weight}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
