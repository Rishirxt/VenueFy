import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.avif";
import banner3 from "../assets/banner3.avif";
import m1 from "../assets/m1.avif";
import m2 from "../assets/m2.avif";
import m3 from "../assets/m3.avif";
import m4 from "../assets/m4.avif";
import m5 from "../assets/m5.avif";
import m6 from "../assets/m6.avif";
import m7 from "../assets/m7.avif";
import m8 from "../assets/m8.avif";
import m9 from "../assets/m9.avif";
import m10 from "../assets/m10.avif";
import m11 from "../assets/m11.avif";
import m12 from "../assets/m12.avif";
import e1 from "../assets/e1.avif";
import e2 from "../assets/e2.avif";
import e3 from "../assets/e3.avif";
import e4 from "../assets/e4.avif";
import e5 from "../assets/e5.avif";

export const banners = [banner1, banner2, banner3];

// Used by Recommended.jsx to match local images to DB movie titles
export const movies = [
  { id: 1, title: "Maa", genre: "Fantasy/Horror/Mythological/Thriller", rating: 7.2, votes: "2.7K", img: m1, promoted: true },
  { id: 2, title: "Kannappa", genre: "Action/Drama/Fantasy/Period", rating: 7.3, votes: "10.7K", img: m2, promoted: true },
  { id: 3, title: "Mission: Impossible - The Final Reckoning", genre: "Action/Adventure/Thriller", rating: 8.6, votes: "84.1K", img: m3 },
  { id: 4, title: "F1: The Movie", genre: "Action/Drama/Sports", rating: 9.5, votes: "6.8K", img: m4 },
  { id: 5, title: "From the World of John Wick: Ballerina", genre: "Action/Thriller", rating: 8.7, votes: "15.2K", img: m5 },
  { id: 6, title: "M3GAN 2.0", genre: "Horror/Sci-Fi/Thriller", rating: 8.4, votes: "117", img: m6 },
  { id: 7, title: "Housefull 5", genre: "Comedy/Thriller", rating: 6.1, votes: "56.3K", img: m7 },
  { id: 8, title: "Sitaare Zameen Par", genre: "Comedy/Drama/Sports", rating: 8.5, votes: "39.6K", img: m8 },
  { id: 9, title: "Naruto the Movie: Ninja Clash in the Land of Snow", genre: "Action/Adventure/Animation/Comedy", rating: 9.6, votes: "51", img: m9 },
  { id: 10, title: "28 Years Later", genre: "Horror/Thriller", rating: 7.9, votes: "3.7K", img: m10 },
  { id: 11, title: "Sinners", genre: "Horror/Thriller", rating: 8.1, votes: "12.4K", img: m11 },
  { id: 12, title: "Kesari Chapter 2", genre: "Action/Drama/History", rating: 7.0, votes: "22.1K", img: m12 },
];

// Used by LiveEvents.jsx for the home page categories section
export const events = [
  { title: "COMEDY SHOWS", img: e1 },
  { title: "AMUSEMENT PARK", img: e2 },
  { title: "THEATRE SHOWS", img: e3 },
  { title: "KIDS", img: e4 },
  { title: "ADVENTURE & FUN", img: e5 },
];

// Used by MovieDetails.jsx filter UI
export const filters = ["2D", "3D", "Wheelchair Friendly", "Premium Seats", "Recliners", "IMAX", "PVR PXL", "4DX", "Laser", "Dolby Atmos"];

// Used by Profile.jsx tab navigation
export const tabs = ["Profile", "Your Orders"];
