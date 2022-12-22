import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div>
      <h1>NOT FOUND</h1>
      <Link to="/">Go home</Link>
    </div>
  );
};
