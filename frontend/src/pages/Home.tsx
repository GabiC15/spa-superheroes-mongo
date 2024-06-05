import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const location = useLocation();
  const casa = location.pathname.split("/").at(-1);

  useEffect(() => {
    fetch(`/api/superheroes?casa=${casa}`).then(async (char) =>
      setCharacters(await char.json())
    );
  }, []);

  return (
    <div className="container flex items-center flex-col">
      <NavBar />
      <h2 className="font-extrabold text-5xl tracking-wide uppercase mt-4">
        Superheroes
      </h2>
      <div className="bg-white h-0.5 w-32 mt-5"></div>
      {!casa ? (
        <p className="text-spacialBlue uppercase text-sm font-semibold italic mt-5">
          124 personajes de Marvel y DC con sus habilidades y descripción
        </p>
      ) : (
        <p className="text-spacialBlue uppercase text-xl font-semibold italic mt-5">
          {casa}
        </p>
      )}

      <div className="max-w-screen-xl grid grid-cols-4 gap-4 mt-10 mb-12">
        {characters?.map((c) => (
          <a href={`/superheroes/${c.nombre}`}>
            <div className="flex flex-col items-center bg-slate-400/10 rounded-lg static overflow-hidden p-2">
              <img
                src={`src/assets/icons/${c.imagenes[0]}.png`}
                alt="Imagen"
                className="max-w-72 transition-all scale-100 hover:scale-110 -translate-y-7"
              />
              <p className="uppercase">{c.nombre}</p>
              <p className="uppercase text-xs text-spacialBlue">
                {c.nombrePersonaje ?? "Sin nombre"}
              </p>
              <p className="mx-8 mb-1 line-clamp-3 text-xs text-center leading-tight text-slate-400">
                {c.biografia}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
