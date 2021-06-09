import Link from "next/link";
import { useRouter } from "next/router";
export default function Navbar() {
  const router = useRouter();
  const isActivo = (r) => {
    if (r === router.pathname) {
      return "active";
    } else {
      return "";
    }
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
                <a className={"nav-link "+isActivo('/')} aria-current="page">
                  Home
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/cart">
                <a className={"nav-link "+isActivo('/cart')}>
                  <i className="fas fa-shopping-cart"></i>
                  Cart
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/signin">
                <a className={"nav-link "+isActivo('/signin')}>
                  <i className="fas fa-user"></i>
                  Sign In
                </a>
              </Link>
            </li>
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link  dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                User Name
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link href="#">
                    <a className="dropdown-item">Profile</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a className="dropdown-item">Logout</a>
                  </Link>
                </li>
              </ul>
            </li>
           */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
