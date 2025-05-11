import "./App.css";
import { useState } from "react";
import TypesBar from "./components/TypesBar";
import PokemonsContainer from "./components/PokemonsContainer";

function App() {
  const [type, setType] = useState("ice");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="wrapper">
      <h1 className="logo-pokemon">포켓몬 도감</h1>

      {/* TypesBar에서 type을 변경합니다. type변경을 할 수 있도록 setType을 props로 전달해주세요 */}
      <TypesBar setType={setType} />
      {/* 변경된 type에 따라서 포켓몬 리스트가 변경됩니다. type을 props로 전달해주세요 */}
      <PokemonsContainer type={type} setSelectedPokemon={setSelectedPokemon} />
      {selectedPokemon && (
        <div className="overlay" onClick={() => setSelectedPokemon(null)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            style={{ color: `var(--${selectedPokemon.types[0].name})` }}
          >
            <div className="pokemon-intro">
              <div className="current-pokemon">
                <img src={selectedPokemon.imgSrc} alt={selectedPokemon.name} />
                <div>
                  <span className="id-number">#{selectedPokemon.paddedId}</span>
                  <h2 className="pokemon-name">{selectedPokemon.name}</h2>
                  <div className="types">
                    {selectedPokemon.types.map(({ name }) => (
                      <div key={name} className={name}>
                        <span>{name}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    키: {selectedPokemon.height} / 몸무게:{" "}
                    {selectedPokemon.weight}
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => setSelectedPokemon(null)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
