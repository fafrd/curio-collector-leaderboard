const imageModules = import.meta.glob('./images/*.{jpg,png,gif}', { eager: true });
const images = Object.fromEntries(
  Object.entries(imageModules).map(([path, mod]) => {
    const name = path.replace('./images/', '').replace(/\.(jpg|png|gif)$/, '');
    return [name, mod.default];
  })
);

const cardNames = [
  "Curio1", "Curio2", "Curio3", "Curio4", "Curio5",
  "Curio6", "Curio7", "Curio8", "Curio9", "Curio10",
  "Curio11", "Curio12", "Curio13", "Curio14", "Curio15",
  "Curio16", "Curio17", "Curio18", "Curio19", "Curio20",
  "Curio21", "Curio22", "Curio23", "Curio24", "Curio25",
  "Curio26", "Curio27", "Curio28", "Curio29", "Curio30",
  "Curio17b",
];

function Cards({ holdings }) {
  const cards = cardNames.map((cardName) => {
    const number = cardName.replace('Curio', '');
    const card = holdings.find((c) => c.type.name === cardName);
    const balance = card
      ? Number(card.unwrapped) + Number(card.wrappedOfficial) + Number(card.wrappedUnofficial)
      : 0;

    return (
      <span key={number}>
        <div className="overlay-container">
          {balance === 0 && <div className="overlay overlay-enabled"></div>}
          <img
            id={`card-${number}`}
            alt={cardName}
            src={images[number]}
            className={balance === 0 ? "grayscale" : ""}
          />
        </div>
        <p>{balance}x</p>
      </span>
    );
  });

  return <div className="card-wrapper">{cards}</div>;
}

export default Cards;
