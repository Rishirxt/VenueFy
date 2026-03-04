// seed-events.ts
import mongoose from "mongoose";
import dayjs from "dayjs";
import { EventModel } from "./src/modules/event/event.model";
import { config } from "./src/config/config";

const musicShows = [
    {
        title: "Arijit Singh Live",
        type: "Music",
        description: "Experience the soulful voice of Arijit Singh live in concert with his iconic Bollywood hits.",
        performers: ["Arijit Singh"],
        posterUrl: "https://imgs.search.brave.com/Huxn-K0dTGvHJqvgDzHcXt4dFqjAwpYWgNIQt38GKCQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYmxh/Y2stYW5kLXdoaXRl/LWFyaWppdC1zaW5n/aC1zb2xvLXBlcmZv/cm1hbmNlLXN0aWxs/LXdoMnV4aWl0cTd3/cDJ5MWIuanBn",
    },
    {
        title: "Diljit Dosanjh – Dil-Luminati Tour",
        type: "Music",
        description: "Global Punjabi superstar Diljit Dosanjh brings his blockbuster Dil-Luminati tour to India.",
        performers: ["Diljit Dosanjh"],
        posterUrl: "https://shorturl.at/vSRgj",
    },
    {
        title: "A.R. Rahman Symphony Night",
        type: "Music",
        description: "The Oscar-winning maestro A.R. Rahman performs his greatest compositions live with a full orchestra.",
        performers: ["A.R. Rahman"],
        posterUrl: "https://shorturl.at/T8faD",
    },
    {
        title: "Sunburn Arena – Martin Garrix",
        type: "Music",
        description: "The world's #1 DJ Martin Garrix brings heart-pounding EDM to India's biggest electronic music event.",
        performers: ["Martin Garrix"],
        posterUrl: "https://images.unsplash.com/photo-1565435403517-a73efd16e6c4?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Coldplay Music of the Spheres",
        type: "Music",
        description: "Critically acclaimed British rock band Coldplay brings their spectacular Music of the Spheres World Tour.",
        performers: ["Coldplay"],
        posterUrl: "https://images.unsplash.com/photo-1512671584073-0ed5878c5679?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

const comedyShows = [
    {
        title: "Zakir Khan – Kuch Bhi Ho Sakta Hai",
        type: "Comedy",
        description: "India's king of relatable comedy Zakir Khan returns with an all-new hilarious stand-up special.",
        performers: ["Zakir Khan"],
        posterUrl: "https://imgs.search.brave.com/ZtB11jaHSKShZjPL-4lfgPvcpjIIJnyHiyOybXxJc6E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk1UZzFNVGcw/TUdVdFltRTNOQzAw/WWpnekxXRXdOREl0/WXpVMU1EUTVNbUZp/Wm1Nd1hrRXlYa0Zx/Y0djQC5qcGc",
    },
    {
        title: "Kenny Sebastian – The Most Interesting Person",
        type: "Comedy",
        description: "Kenny Sebastian brings his signature gentle humor and musical comedy to a live stage near you.",
        performers: ["Kenny Sebastian"],
        posterUrl: "https://ln.run/CWWSt",
    },
    {
        title: "Biswa Kalyan Rath – Bespoke",
        type: "Comedy",
        description: "The intellectual comedian Biswa Kalyan Rath performs his sharp, witty stand-up show live.",
        performers: ["Biswa Kalyan Rath"],
        posterUrl: "https://imgs.search.brave.com/7XbzbjfQs8F9zDA64WWlkHlSEro5ihpayk0YwOp0dGg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpXVXpZVFF4/TmpBdE1qTm1NQzAw/TnpRNUxXRmxOalF0/TW1Nd04yVTRNMlZt/TkRRelhrRXlYa0Zx/Y0djQC5qcGc",
    },
    {
        title: "Kapil Sharma Live",
        type: "Comedy",
        description: "The king of Indian comedy Kapil Sharma brings laughter and fun to a sold-out live audience.",
        performers: ["Kapil Sharma"],
        posterUrl: "https://ln.run/I0aYf",
    },
    {
        title: "Vir Das – For India",
        type: "Comedy",
        description: "International stand-up sensation Vir Das returns to India with his acclaimed global comedy special live.",
        performers: ["Vir Das"],
        posterUrl: "https://surl.li/glqbir",
    },
];

const venues = [
    { venue: "DY Patil Stadium", city: "Mumbai", state: "Maharashtra" },
    { venue: "JLN Stadium", city: "Delhi", state: "Delhi" },
    { venue: "KTPO Convention Centre", city: "Bengaluru", state: "Karnataka" },
    { venue: "Gachibowli Stadium", city: "Hyderabad", state: "Telangana" },
    { venue: "Jawaharlal Nehru Indoor Stadium", city: "Chennai", state: "Tamil Nadu" },
    { venue: "Netaji Indoor Stadium", city: "Kolkata", state: "West Bengal" },
    { venue: "VDSS Arena", city: "Ahmedabad", state: "Gujarat" },
    { venue: "Balewadi Sports Complex", city: "Pune", state: "Maharashtra" },
];

const times = ["05:00 PM", "06:30 PM", "07:00 PM", "08:00 PM"];

const seedEvents = async () => {
    await EventModel.deleteMany({});
    console.log("🧹 Existing events deleted.");

    const allShowTemplates: any[] = [...musicShows, ...comedyShows];
    const today = dayjs();
    const events: any[] = [];

    for (const template of allShowTemplates) {
        for (const venue of venues) {
            // Each show+venue gets a random 3-4 of the 7 available date offsets
            const allOffsets = [0, 2, 4, 6, 8, 10, 12];
            const numDates = Math.floor(Math.random() * 2) + 3; // 3 or 4 dates
            const shuffled = allOffsets.sort(() => Math.random() - 0.5).slice(0, numDates);

            for (const d of shuffled) {
                const eventDate = today.add(d, "day").format("YYYY-MM-DD"); // ISO format - safe for all parsers
                const time = times[Math.floor(Math.random() * times.length)];

                events.push({
                    title: template.title,
                    type: template.type,
                    description: template.description,
                    performers: template.performers,
                    venue: venue.venue,
                    city: venue.city,
                    state: venue.state,
                    date: eventDate,
                    time,
                    posterUrl: template.posterUrl,
                    tickets: template.type === "Comedy"
                        ? {
                            FanPit: { price: 1000, total: 200, available: 200 },
                            VIP: { price: 750, total: 500, available: 500 },
                            GA: { price: 500, total: 2000, available: 2000 },
                        }
                        : {
                            FanPit: { price: 4000, total: 200, available: 200 },
                            VIP: { price: 3000, total: 500, available: 500 },
                            GA: { price: 2000, total: 2000, available: 2000 },
                        },
                });
            }
        }
    }

    await EventModel.insertMany(events);
    console.log(`✅ Seeded ${events.length} live events (Music + Comedy) across all cities.`);
};

mongoose
    .connect(config.databaseURL as string)
    .then(async () => {
        console.log("DB connected");
        await seedEvents();
        mongoose.disconnect();
    })
    .catch((err) => console.log(err));
