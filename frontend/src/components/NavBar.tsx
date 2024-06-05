import logo from "/vite.svg";

export default function NavBar() {
  return (
    <div className="w-full h-20 p-5 flex justify-between">
      <img src={logo} className="h-max" alt="logo" />

      <div className="flex gap-4 text-base text-white ">
        <a href="/marvel" className="uppercase">
          Marvel
        </a>
        <a href="/dc" className="uppercase">
          DC
        </a>
        <a href="/edicion/nuevo" className="uppercase">
          Nuevo
        </a>
      </div>
    </div>
  );
}
