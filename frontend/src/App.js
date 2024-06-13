import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';

 function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;