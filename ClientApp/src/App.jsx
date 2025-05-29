import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Inventory from './components/Inventory';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/inventory" />} />
      <Route path="/inventory" element={token ? <Inventory /> : <Navigate to="/login" />} />
      <Route path="/" element={<Navigate to={token ? "/inventory" : "/login"} />} />
    </Routes>
  );
}

export default App;