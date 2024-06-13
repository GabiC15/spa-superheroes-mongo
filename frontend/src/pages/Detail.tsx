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
          <h1 className="text-3xl font-bold text-white whitespace-nowrap">
            {character?.nombre}
          </h1>
        </div>
        <div className="flex items-center mb-4">
          {currentImage > 0 && (
            <img
              src="../src/assets/icons/left.png"
              className="h-6"
              onClick={() => setCurrentImage(currentImage - 1)}
              alt="Left"
            />
          )}
          <img
            src={`../src/assets/icons/${character?.imagenes[currentImage]}.png`}
            alt={character?.nombre}
            className="w-96 rounded-full -translate-y-5 hover:scale-125 transition-transform"
          />
          {currentImage < character?.imagenes.length - 1 && (
            <img
              src="../src/assets/icons/right.png"
              className="h-6"
              onClick={() => setCurrentImage(currentImage + 1)}
              alt="Right"
            />
          )}
        </div>
        <div className="flex flex-col ml-7">
          <div className="flex gap-10">
            <div>
              <p className="text-gray-400">Nombre:</p>
              <p className="text-white">{character?.nombre}</p>
            </div>
            <div className="flex gap-3 items-end">
              <p className="text-gray-400">Casa:</p>
              <img
                src={`../src/assets/icons/${character?.casa}.png`}
                alt={character?.casa}
                className="h-8"
              />
            </div>
          </div>
          <div className="mb-4">
            <p className="text-gray-400">Biografía:</p>
            <p className="text-white">{character?.biografia}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-400">Equipamiento:</p>
            <p className="text-white">{character?.equipamiento}</p>
          </div>
          <div className="flex gap-5">
            <div>
              <p className="text-gray-400">Año de Aparición:</p>
              <p className="text-white">{character?.anio}</p>
            </div>
            <div>
              <p className="text-gray-400">Cantidad de imagenes:</p>
              <p className="text-white">{character?.imagenes.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
