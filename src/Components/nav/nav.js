import "./nav.css";
import { HashLink as Link } from "react-router-hash-link";
export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <h2>Imager</h2>
      </div>

      <div className="nav-list">
        <ul>
          <li>
            <Link to="#home" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="#images" className="link">
              Images
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
