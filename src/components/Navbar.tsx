import { NavLink, Link } from "react-router";

const Navbar = () => {
  return (
    <div className="px-10 py-3 flex bg-slate-800 shadow text-slate-50 text-lg font-medium">
      <div className="flex-none w-10 h-10">
        <Link to="/">
          <img src="/vite.svg" alt="logo" />
        </Link>
      </div>

      <nav className="ml-auto flex w-fit gap-5 my-auto">
        <NavLink
          className={({ isActive }) =>
            `hover:text-white transition-all ${
              isActive
                ? "text-slate-50 border-b-2 border-slate-400"
                : "hover:opacity-70"
            }`
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `hover:text-white transition-all ${
              isActive
                ? "text-slate-50 border-b-2 border-slate-400"
                : "hover:opacity-70"
            }`
          }
          to="/models-about"
        >
          Models About
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `hover:text-white transition-all ${
              isActive
                ? "text-slate-50 border-b-2 border-slate-400"
                : "hover:opacity-70"
            }`
          }
          to="/datasets-about"
        >
          Datasets About
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
