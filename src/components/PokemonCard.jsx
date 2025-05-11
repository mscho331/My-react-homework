import { getTypeIconSrc } from "../utils/pokemon-helper";

// formatPokemonData로 변환되어 있는 pokemon을 props로 받아옵니다.
const PokemonCard = ({ pokemon, onClick }) => {
  const { paddedId, name, types, imgSrc } = pokemon;
  return (
    <div className={`pokemon-card ${types[0].name}`} onClick={onClick}>
      <div>
        <span className="id-number">{"#" + paddedId}</span>
        <span className="pokemon-name">{name}</span>

        <div className="types">
          {types.map(({ name }) => {
            const typeImg = getTypeIconSrc(name);

            return (
              <div key={name} className={name}>
                <img src={typeImg} alt={name} />
                <span className="type-name">{name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pokeball-bg"></div>
      <img className="pokemon-image" src={imgSrc} alt="pokemon-image" />
    </div>
  );
};

export default PokemonCard;
