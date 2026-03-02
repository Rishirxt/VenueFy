import mongoose from "mongoose";
import { OrderModel } from "./backend/src/modules/order/order.model";
import { ShowModel } from "./backend/src/modules/show/show.model";

async function clearData() {
    try {
        await mongoose.connect("mongodb://localhost:27017/Venuefy");
        console.log("Connected to MongoDB");

        // 1. Delete all orders
        const orderResult = await OrderModel.deleteMany({});
        console.log(`Deleted ${orderResult.deletedCount} orders.`);

        // 2. Reset all seats to AVAILABLE in all shows
        // We use a nested update with filtered positional operators if possible, 
        // or just iterate if the structure is complex.
        // A simpler way is to update all seatLayout elements.

        const shows = await ShowModel.find({});
        console.log(`Resetting seats for ${shows.length} shows...`);

        for (const show of shows) {
            if (show.seatLayout && show.seatLayout.length > 0) {
                show.seatLayout.forEach(row => {
                    row.seats.forEach(seat => {
                        seat.status = "AVAILABLE";
                    });
                });
                show.markModified('seatLayout');
                await show.save();
            }
        }

        console.log("All seats have been reset to AVAILABLE.");
        console.log("SUCCESS: Database cleared successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Cleanup failed:", error);
        process.exit(1);
    }
}

clearData();
