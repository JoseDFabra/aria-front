import { Link } from "react-router-dom";
import "../styleSheet/navigate.css";

export function Navigation() {
  return (
    <>
      <div className="nav">
        <h4>ARIA - ROBOT HDI</h4>
        <div className="links">
          <div className="link">
            <Link to="/crud">Crud</Link>
          </div>
          <div className="link">
            <Link to="/views">Views</Link>
          </div>
        </div>
      </div>
    </>
  );
}
