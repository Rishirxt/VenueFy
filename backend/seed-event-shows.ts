// seed/eventShowSeeder.ts

import mongoose from "mongoose";
import dayjs from "dayjs";
import { EventModel } from "./src/modules/event/event.model";
import { VenueModel } from "./src/modules/venue/venue.model";
import { EventShowModel } from "./src/modules/eventShow/eventShow.model";
import { config } from "./src/config/config";
import { generateSeatLayout } from "./src/utils/index";

const generatePriceMap = () =>
    new Map([
        ["VIP", 3500],       // Premium floor / front rows
        ["PREMIUM", 2000],   // Reserved seating
        ["GENERAL", 999],    // Open seating / balcony
    ]);

// 🎤 Evening-heavy slots typical for Tamil Nadu events
const fixedTimeSlots = [
    { start: "05:30 PM", end: "07:30 PM" },
    { start: "07:00 PM", end: "09:30 PM" },
    { start: "08:30 PM", end: "11:00 PM" },
];

export const seedEventShows = async () => {
    const events = await EventModel.find({});
    const venues = await VenueModel.find({});

    if (!events.length || !venues.length) {
        console.error(
            "Events or venues not found. Please seed events and venues first."
        );
        return;
    }

    console.log(
        `Found ${events.length} events and ${venues.length} venues. Generating shows...`
    );

    const today = dayjs().startOf("day");
    let showsCreated = 0;

    for (const venue of venues) {
        for (const event of events) {
            for (let d = 0; d < 7; d++) {
                const showDate = today.add(d, "day");
                const formattedDate = showDate.format("DD-MM-YY");

                // 2 slots per day — evenings are peak for Tamil Nadu shows
                const selectedSlots = fixedTimeSlots.slice(0, 2);

                for (const slot of selectedSlots) {
                    const newShow = new EventShowModel({
                        event: event._id,
                        venue: venue._id,
                        location: venue.state, // "Tamil Nadu"
                        audioType: "Dolby Atmos",
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

    console.log(
        `✅ Event show seeding completed. ${showsCreated} shows created across Tamil Nadu.`
    );
};

mongoose
    .connect(config.databaseURL as string)
    .then(async () => {
        console.log("DB connected");
        await EventShowModel.deleteMany({});
        console.log("🧹 Existing event shows deleted.");
        await seedEventShows();
        mongoose.disconnect();
    })
    .catch((err) => console.log(err));
