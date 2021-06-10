import Navbar from "../Navbar/Navbar";
import Notify from "../Notify/Notify";
export default function Layaut({ children }) {
  return (
    <div className="container">
      <Navbar />
      <Notify />
      {children}
    </div>
  );
}
