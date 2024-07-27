import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./card.css";

const AllCards = () => {
  const [cards, setCards] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
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
    <div className="md:px-32 my-10">
      <h3 className="text-center text-5xl font-semibold italic">
        Explore All Pokemon Cards
      </h3>
      {/* search bar */}
      <div className="mb-10 flex justify-between my-5">
        <div>
          <h1 className="font-bold text-base">Search Pokémon</h1>
          <p className="text-[#7C7C7C] font-medium text-sm">
            Total {filteredCards.length} Pokémon
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <CiSearch className="w-7 h-7" />
          <input
            type="text"
            placeholder="Search by Pokémon name..."
            value={searchTitle}
            onChange={handleSearchTitle}
            className="outline-none text-[#7C7C7C] font-semibold"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 space-y-5">
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
                <h1 className="text-xl font-bold capitalize">{card.name}</h1>
                <p className="capitalize">
                  <span className=" font-semibold">Type:</span>{" "}
                  {card.types.map((type) => type.type.name).join(", ")}
                </p>
                <p>
                  <span className=" font-semibold">Height:</span> {card.height}
                </p>
                <p>
                  <span className=" font-semibold">Weight:</span> {card.weight}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCards;
