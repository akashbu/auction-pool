import './App.css';
import Navbar from './components/Navbar/Navbar'
import Cards from './components/Cards/Cards'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SellerFormDetails from './components/Seller/SellerFormDetails';
import BuyerFormDetails from './components/Buyer/BuyerFormDetails';
import AuctionList from './components/AuctionList/AuctionList';
import PropertyDetails from './components/AuctionList/PropertyDetails';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Cards />} />
          <Route exact path="/seller" element={<SellerFormDetails/>}/>
          <Route exact path="/buyer" element={<BuyerFormDetails/>}/>
          <Route exact path="/auctionList" element={<AuctionList/>}/>
          <Route exact path="/auctionList/:id" element={<PropertyDetails/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
