import { useNavigate } from 'react-router-dom';


function Signout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="nav-link" style={{ background: "none", border: "none", padding: "0", margin: "0", color: "var(--bs-nav-link-color)", textDecoration: "none", cursor: "pointer" }}>
      Signout
    </button>
  );
}



export default Signout;
