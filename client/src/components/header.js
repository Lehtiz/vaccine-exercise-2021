import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div className="justify-center items-center bg-background-under">
      <div className="text-center bg-background-fore text-textcolor p-2">
        <NavLink to="/">
          <span className="text-2xl font-bold text-white cursor-pointer mr-5">Home</span>
        </NavLink>
        <NavLink to="/orders/">
          <span className="text-2xl font-bold text-white cursor-pointer mr-5">Orders</span>
        </NavLink>
        <NavLink to="/vaccinations/">
          <span className="text-2xl font-bold text-white cursor-pointer mr-5">Vaccinations</span>
        </NavLink>
      </div>
    </div>
  );
}
