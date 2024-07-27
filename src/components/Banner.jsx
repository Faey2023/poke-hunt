const Banner = () => {
  return (
    <div
      className="hero min-h-screen bg-fixed"
      style={{
        backgroundImage: "url(https://i.ibb.co/3mPJkW7/AG-main-EN.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <h1 className="text-xl md:text-7xl text-center font-bold">
          Dive Into the World of Pokémon with Ease
        </h1>
      </div>
    </div>
  );
};

export default Banner;
