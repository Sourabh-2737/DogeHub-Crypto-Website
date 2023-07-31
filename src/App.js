import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../src/Components/Header';
import Home from '../src/Components/Home';
import Exchanges from '../src/Components/Exchanges';
import Coins from '../src/Components/Coins';
import CoinDetails from '../src/Components/CoinDetails';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/coins" element={<Coins/>} />
          <Route path="/exchanges" element={<Exchanges/>} />
          <Route path="/coins/:id" element={<CoinDetails/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
