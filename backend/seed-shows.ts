// seed/showSeeder.ts
import mongoose from "mongoose";
import dayjs from "dayjs";
import { MovieModel } from "./src/modules/movie/movie.model";
import { TheaterModel } from "./src/modules/theatre/theater.model";
import { ShowModel } from "./src/modules/show/show.model";
import { config } from "./src/config/config";
import { generateSeatLayout } from "./src/utils/index"


const generatePriceMap = () =>
    new Map([
        ["PREMIUM", 510],
        ["EXECUTIVE", 290],
        ["NORMAL", 180],
    ]);

const formats = ["2D", "3D", "IMAX", "PVR PXL"];

// 🎞️ Realistic time slots
const fixedTimeSlots = [
    { start: "09:00 AM", end: "11:30 AM" },
    { start: "12:30 PM", end: "03:00 PM" },
    { start: "04:00 PM", end: "06:30 PM" },
    { start: "07:30 PM", end: "10:00 PM" },
    { start: "10:30 PM", end: "01:00 AM" },
];

export const seedShows = async () => {
    const movies = await MovieModel.find({});
    const theatres = await TheaterModel.find({});

    if (!movies.length || !theatres.length) {
        console.error("Movies or theatres not found. Please seed movies and theaters first.");
        return;
    }

    console.log(`Found ${movies.length} movies and ${theatres.length} theatres. Generating shows...`);

    const today = dayjs().startOf("day");
    let showsCreated = 0;

    for (const theatre of theatres) {
        for (const movie of movies) {
            for (let d = 0; d < 7; d++) { // every day for next 7 days
                const showDate = today.add(d, "day");
                const formattedDate = showDate.format("DD-MM-YY");
                // 3 fixed time slots per day per movie/theatre combo
                const selectedSlots = fixedTimeSlots.slice(0, 3);

                for (const slot of selectedSlots) {
                    const newShow = new ShowModel({
                        movie: movie._id,
                        theater: theatre._id,
                        location: theatre.state, // ✅ store state name
                        format: formats[Math.floor(Math.random() * formats.length)],
                        audioType: "Dolby 7.1",
                        startTime: slot.start,
                        date: formattedDate,
                        priceMap: generatePriceMap(),
                        seatLayout: generateSeatLayout(),
                    });

                    await newShow.save();
                    showsCreated++;
                }
            }
        }
    }

    console.log(`✅ Show seeding completed. ${showsCreated} shows created across all states.`);
};

mongoose
    .connect(config.databaseURL as string)
    .then(async () => {
        console.log("DB connected");
        await ShowModel.deleteMany({});
        console.log("🧹 Existing shows deleted.");
        await seedShows();
        mongoose.disconnect();
    })
    .catch((err) => console.log(err));