import { getTypeIconSrc } from "../utils/pokemon-helper";
import { useEffect, useState } from "react";

// API로 포켓몬 타입을 받아온 후, 화면에 타입들을 보여주는 컴포넌트 입니다.
// 함수를 props로 받아와서 App.jsx의 type 상태를 바꿔봅시다.
const TypesBar = ({ setType }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      // API의 Response를 확인하고자 한다면 엔드포인트를 복사한 후, 브라우저에 붙여넣어보세요!
      /*  모든 포켓몬 타입들을 불러오는 API   */
      const API_END_POINT = `https://pokeapi.co/api/v2/type/`;
      const res = await fetch(API_END_POINT);
      const data = await res.json();
      const filtered = data.results.filter(
        ({ name }) =>
          name !== "unknown" && name !== "shadow" && name !== "stellar"
      );
      setTypes(filtered);
    };
    fetchTypes();
  }, []);

  // App.css에서 types-bar 스타일을 완성해주세요
  return (
    <nav className="types-bar">
      {/* API로 받아온 type 리스트를 상태로 관리하고, 그 상태를 기반으로 리스트 렌더링을 구현해주세요 */}
      {/* type의 이름을 넣으면 해당 타입의 이미지 source를 return하는 getTypeIconSrc를 사용해서 구현해주세요 */}
      {types.map(({ name }) => {
        return (
          // a 태그의 배경은 App.css의 .dragon 과 같이 타입별 background를 사용합니다.
          <a
            key={name}
            style={{ color: "var(--${name})" }}
            onClick={() => setType(name)}
            className={name}
          >
            {/* img 태그를 사용해서 타입 이미지를 넣어주세요 */}
            <img src={getTypeIconSrc(name)} alt={name} />
          </a>
        );
      })}
    </nav>
  );
};

export default TypesBar;
