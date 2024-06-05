import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function Detail() {
  const [currentImage, setCurrentImage] = useState(0);
  const [character, setCharacter] = useState(null);
  const params = useParams();

  useEffect(() => {
    fetch(`/api/superheroes/${params.id}`).then(async (char) =>
      setCharacter(await char.json())
    );
  }, []);

  return (
    <div>
      <div className="mt-10 flex mx-5 p-8 pl-20 bg-gray-800 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-4xl font-bold text-white whitespace-nowrap">
            {character?.nombre}
          </h1>
          <img
            src={`../src/assets/icons/${character?.casa}.png`}
            alt={character?.casa}
            className="h-10"
          />
        </div>
        <div className="flex items-center mb-4">
          {currentImage > 0 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className="h-6 mx-3 translate-x-7 fill-white z-10"
              onClick={() => setCurrentImage(currentImage - 1)}
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          )}
          <img
            src={`../src/assets/icons/${character?.imagenes[currentImage]}.png`}
            alt={character?.nombre}
            className="w-96 rounded-full -translate-y-5"
          />
          {currentImage < character?.imagenes.length - 1 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className="h-6 mx-3 -translate-x-7 fill-white z-10"
              onClick={() => setCurrentImage(currentImage + 1)}
            >
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          )}
        </div>
        <div className="flex flex-col">
          <div>
            <p className="text-gray-400">Nombre:</p>
            <p className="text-white">{character?.nombre}</p>
            <p className="text-gray-400">Casa:</p>
            <p className="text-white">{character?.casa}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-400">Biografía:</p>
            <p className="text-white">{character?.biografia}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-400">Equipamiento:</p>
            <p className="text-white">{character?.equipamiento}</p>
          </div>
          <p className="text-gray-400">Año de Aparición:</p>
          <p className="text-white">{character?.anio}</p>
        </div>
      </div>
    </div>
  );
}
