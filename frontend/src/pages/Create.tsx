import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useHistory, useParams } from "react-router-dom";

export default function Create() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [known, setKnown] = useState(false);
  const history = useHistory();
  const [formData, setFormData] = useState({
    nombre: "",
    nombrePersonaje: "",
    anio: "",
    casa: "",
    biografia: "",
    equipamiento: "",
    imagenes: [],
  });

  useEffect(() => {
    if (params.id != "nuevo") {
      fetch(`/api/superheroes/${params.id}`).then(async (char) =>
        setFormData(await char.json())
      );
    }
  }, []);

  useEffect(() => {
    if (params.id == "nuevo") {
      fetch(`/api/superheroes/${formData.nombre}`).then(async (char) =>
        setKnown((await char.json()) ? true : false)
      );
    }
  }, [formData.nombre]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  console.log(known);

  const handleCreate = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/superheroes/${formData.nombre}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el personaje");
      }

      console.log("Personaje guardado correctamente");
      setSuccess("Se ha creado el superheroe correctamente!");

      setTimeout(() => {
        history.push(`/edicion/${formData.nombre}`);
        history.go(0);
      }, 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/superheroes/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el personaje");
      }

      console.log("Personaje actualizado correctamente");
      setSuccess("Se ha actualizado el superheroe correctamente!");

      setTimeout(() => {
        history.push(`/edicion/${formData.nombre}`);
        history.go(0);
      }, 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/superheroes/${params.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el personaje");
      }

      console.log("Personaje eliminado correctamente");
      setSuccess("Se ha eliminado el superheroe correctamente!");

      setTimeout(() => {
        history.push("/");
        history.go(0);
      }, 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (params.id != "nuevo" && !formData) {
    return <div>No existe el personaje</div>;
  }

  return (
    <div className="flex items-center flex-col">
      <NavBar />
      <h2 className="font-extrabold text-5xl tracking-wide uppercase mt-4">
        Crear superheroe
      </h2>
      <div className="bg-slate-300 h-0.5 w-32 mt-5"></div>
      <p className="text-spacialBlue uppercase text-sm font-semibold italic mt-5">
        Crea un nuevo superheroe
      </p>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {success && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-2"
          role="alert"
        >
          <span className="block sm:inline">{success}</span>
        </div>
      )}

      <form
        onSubmit={handleCreate}
        className="flex flex-col gap-4 min-w-[40rem] mb-10"
      >
        <div className="flex gap-3 items-end">
          <div className="w-full">
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-slate-200"
            >
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 text-gray-800 bg-slate-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {formData.nombre && <p className="text-4xl">{known ? "✅" : "❌"}</p>}
        </div>
        <div>
          <label
            htmlFor="nombrePersonaje"
            className="block text-sm font-medium text-slate-200"
          >
            Nombre del Personaje:
          </label>
          <input
            type="text"
            name="nombrePersonaje"
            id="nombrePersonaje"
            value={formData.nombrePersonaje}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 text-gray-800 bg-slate-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="anio"
            className="block text-sm font-medium text-slate-200"
          >
            Año de Aparición:
          </label>
          <input
            type="number"
            name="anio"
            id="anio"
            value={formData.anio}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 text-gray-800 bg-slate-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="flex gap-4 justify-between items-end">
          <div className="w-full">
            <label
              htmlFor="casa"
              className="block text-sm font-medium text-slate-200"
            >
              Casa:
            </label>
            <input
              type="text"
              name="casa"
              id="casa"
              pattern="^(Marvel|DC)$"
              placeholder="Marvel o DC"
              value={formData.casa}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 text-gray-800 bg-slate-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {["dc", "marvel"].includes(formData.casa.toLowerCase()) && (
            <img
              src={`../src/assets/icons/${formData.casa}.png`}
              className="h-12"
              alt="Casa"
            />
          )}
        </div>

        <div>
          <label
            htmlFor="biografia"
            className="block text-sm font-medium text-slate-200"
          >
            Biografía:
          </label>
          <textarea
            name="biografia"
            id="biografia"
            value={formData.biografia}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 text-gray-800 bg-slate-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="equipamiento"
            className="block text-sm font-medium text-slate-200"
          >
            Equipamiento:
          </label>
          <input
            type="text"
            name="equipamiento"
            id="equipamiento"
            value={formData.equipamiento}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 text-gray-800 bg-slate-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {params.id == "nuevo" ? (
          <button
            type="submit"
            className="text-center px-4 py-2 bg-green-500 disabled:bg-green-400 border border-transparent rounded-md font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 mt-2"
            disabled={isLoading || !known}
          >
            {isLoading ? "Cargando..." : "Guardar Personaje"}
          </button>
        ) : (
          <div className="flex flex-col">
            <button
              type="button"
              className="text-center px-4 py-2 bg-spacialBlue border border-transparent rounded-md font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 mt-2"
              disabled={isLoading}
              onClick={handleUpdate}
            >
              {isLoading ? "Cargando..." : "Actualizar Personaje"}
            </button>
            <button
              type="button"
              className="text-center px-4 py-2 bg-red-500 border border-transparent rounded-md font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 mt-4"
              disabled={isLoading}
              onClick={handleDelete}
            >
              {isLoading ? "Cargando..." : "Eliminar Personaje"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
