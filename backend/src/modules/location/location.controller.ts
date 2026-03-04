import { RequestHandler } from "express";

export const reverseGeocode: RequestHandler = async (req, res) => {
    try {
        const { lat, lon } = req.query;

        if (!lat || !lon) {
            res.status(400).json({ mission: "Latitude and longitude are required" });
            return;
        }

        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
            {
                headers: {
                    "User-Agent": "VenueFy-App/1.0",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`External API responded with status ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error: any) {
        console.error("Geocoding Error:", error);
        res.status(500).json({ message: "Failed to fetch location data", error: error.message });
    }
};
