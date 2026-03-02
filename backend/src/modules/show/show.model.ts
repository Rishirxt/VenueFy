import mongoose, { Schema } from "mongoose";
import { IShow } from "./show.interface";

const showSchema = new Schema<IShow>({
    movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    theater: { type: Schema.Types.ObjectId, ref: "Theater", required: true },
    location: { type: String, required: true },
    format: {
        type: String,
        enum: ["2D", "3D", "IMAX", "PVR PXL"],
        required: true
    },
    audioType: { type: String, default: "Dolby Atmos" },
    startTime: { type: String, required: true },
    date: { type: String, required: true },
    priceMap: { type: Map, of: Number, required: true, default: {} },
    seatLayout: [{
        row: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        seats: [{
            number: { type: Number, required: true },
            status: { type: String, enum: ["AVAILABLE", "BOOKED", "BLOCKED"], default: "AVAILABLE" }
        }]
    }]
}, { timestamps: true });

export const ShowModel = mongoose.model<IShow>("Show", showSchema);