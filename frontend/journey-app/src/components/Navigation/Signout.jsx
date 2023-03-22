function Signout({ onLogout }) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <button onClick={handleLogout} className="nav-link" style={{ background: "none", border: "none", padding: "0", margin: "0", color: "var(--bs-nav-link-color)", textDecoration: "none", cursor: "pointer" }}>
      Signout
    </button>

  );
}


export default Signout;
