// File: src/modules/venue/venue.seed.ts

import mongoose from "mongoose";
import dotenv from "dotenv";
import { VenueModel } from "../modules/venue/venue.model";
import { config } from "../config/config";

dotenv.config();

mongoose
    .connect(config.databaseUrl as string)
    .then(async () => {
        console.log("Connected to MongoDB ✅");

        // Tamil Nadu cities and their well-known areas
        const cities = [
            {
                name: "Chennai",
                state: "Tamil Nadu",
                areas: ["T Nagar", "Anna Nagar", "Velachery", "Adyar", "Nungambakkam", "Egmore"],
            },
            {
                name: "Coimbatore",
                state: "Tamil Nadu",
                areas: ["RS Puram", "Gandhipuram", "Peelamedu", "Saibaba Colony"],
            },
            {
                name: "Madurai",
                state: "Tamil Nadu",
                areas: ["Anna Nagar", "KK Nagar", "Teppakulam", "Tallakulam"],
            },
            {
                name: "Trichy",
                state: "Tamil Nadu",
                areas: ["Thillai Nagar", "Srirangam", "Woraiyur", "Ariyamangalam"],
            },
            {
                name: "Salem",
                state: "Tamil Nadu",
                areas: ["Fairlands", "Shevapet", "Suramangalam", "Hasthampatti"],
            },
            {
                name: "Tirunelveli",
                state: "Tamil Nadu",
                areas: ["Palayamkottai", "Melapalayam", "Vannarpet", "Pettai"],
            },
            {
                name: "Vellore",
                state: "Tamil Nadu",
                areas: ["Katpadi", "Sathuvachari", "Gandhi Nagar", "Bagayam"],
            },
            {
                name: "Erode",
                state: "Tamil Nadu",
                areas: ["Perundurai", "Surampatti", "Chithode", "Veerappan Chatram"],
            },
            {
                name: "Tiruppur",
                state: "Tamil Nadu",
                areas: ["Avinashi Road", "Palladam", "Kangeyam Road", "Sudiyur"],
            },
            {
                name: "Thanjavur",
                state: "Tamil Nadu",
                areas: ["Medical College Road", "Kumbakonam Road", "Nanjikottai", "Old Bus Stand"],
            },
        ];

        // Real-style Tamil Nadu comedy & concert venues
        const venueTemplates = [
            {
                brand: "BFLKS Arena",
                logo: "https://res.cloudinary.com/amritrajmaurya/image/upload/v1751788726/omht27letnpbbaj2w0op.avif",
            },
            {
                brand: "Music Academy",
                logo: "https://res.cloudinary.com/amritrajmaurya/image/upload/v1751788726/yxjgnxhxlccfdon3fyzg.avif",
            },
            {
                brand: "Kalai Arangam",
                logo: "https://res.cloudinary.com/amritrajmaurya/image/upload/v1751788726/eebu3t34depdmmgxyknq.avif",
            },
            {
                brand: "Nehru Indoor Stadium",
                logo: "https://res.cloudinary.com/amritrajmaurya/image/upload/v1751788726/omht27letnpbbaj2w0op.avif",
            },
        ];

        const venues = [];

        for (const city of cities) {
            const numVenues = Math.floor(Math.random() * 2) + 3; // 3 or 4 venues per city
            for (let i = 0; i < numVenues; i++) {
                const template = venueTemplates[i % venueTemplates.length];
                const area = city.areas[i % city.areas.length];
                venues.push({
                    name: `${template.brand} - ${area}`,
                    location: `${area}, ${city.name}`,
                    city: city.name,
                    state: city.state,
                    logo: template.logo,
                });
            }
        }

        await VenueModel.deleteMany({});
        await VenueModel.insertMany(venues);

        console.log(`✅ Seeded ${venues.length} Tamil Nadu venues successfully.`);
        process.exit(0);
    })
    .catch((err) => {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1);
    });
