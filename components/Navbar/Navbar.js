import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import Image from "next/image";
import Cookie from "js-cookie";

export default function Navbar() {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const isActivo = (r) => {
    if (r === router.pathname) {
      return "active";
    } else {
      return "";
    }
  };
  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accesToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } });
  };
  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link  dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ justifyContent: "space-around", width: " 7em" }}
        >
          <Image
            src={auth.user.avatar}
            alt={auth.user.name}
            width={30}
            height={30}
            className="avatar"
          />
          {auth.user.name}
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <li>
            <Link href="#">
              <a className="dropdown-item">Profile</a>
            </Link>
          </li>
          <li>
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </li>
    );
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">CDK</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/">
                <a className={"nav-link " + isActivo("/")} aria-current="page">
                  Home
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/cart">
                <a className={"nav-link " + isActivo("/cart")}>
                  <i className="fas fa-shopping-cart"></i>
                  Cart
                </a>
              </Link>
            </li>
            {Object.keys(auth).length === 0 ? (
              <li className="nav-item">
                <Link href="/signin">
                  <a className={"nav-link " + isActivo("/signin")}>
                    <i className="fas fa-user"></i>
                    Sign In
                  </a>
                </Link>
              </li>
            ) : (
              loggedRouter()
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
