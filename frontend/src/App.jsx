import { Routes, Route } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import MovieDetails from "./pages/MovieDetails";
import Profile from "./pages/Profile";
import { useLocation } from "react-router-dom";
import SeatLayout from "./pages/SeatLayout";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
function App() {
  const location = useLocation();
  const isSeatLayout = location.pathname.includes("/seat-layout");
  const isCheckoutPage = location.pathname.includes("/checkout");
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {!isSeatLayout && !isCheckoutPage && <Header />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<h1>Profile Page</h1>} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:state/:movieName/:id/ticket" element={<MovieDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shows/:showId/seat-layout" element={<SeatLayout />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        {!isSeatLayout && !isCheckoutPage && <Footer />}
      </div>
    </>
  );
}

export default App
