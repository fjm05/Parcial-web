const DigimonCard = ({ name, image, onDelete }) => {
  return (
    <div className="digimon-card">
      <img src={image} alt={name} width="120" />
      <h3>{name}</h3>

      <button onClick={onDelete}>
        Eliminar
      </button>
    </div>
  );
};

export default DigimonCard;