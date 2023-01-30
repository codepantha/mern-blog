import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components';
import { Home, Login, Register } from './pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
