import { axiosWrapper } from "./axiosWrapper";

// List all the endpoints;
export const getRecommendedMovies = () => axiosWrapper.get("/movies/recommended");
export const getAllMovies = () => axiosWrapper.get("/movies");
export const getMoviesById = (data) => axiosWrapper.get(`/movies/${data}`);

export const getShowsByMovieAndLocation = (movieId, state, date) =>
    axiosWrapper.get("/shows", {
        params: {
            movieId,
            state,
            date
        }
    });

export const getShowById = (data) => axiosWrapper.get(`/shows/${data}`);

export const getAllShows = (state) => axiosWrapper.get("/shows/all", { params: { state } });

export const getEvents = (state, type) => axiosWrapper.get("/events", { params: { state, type } });
export const getEventById = (id) => axiosWrapper.get(`/events/${id}`);
export const bookEventTicket = (data) => axiosWrapper.post("/events/book", data);