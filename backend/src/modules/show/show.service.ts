import { Types } from "mongoose";
import { generateSeatLayout, groupShowsByTheater } from "../../utils";
import { IShow } from "./show.interface";
import { ShowModel } from "./show.model";

// 1. Create a show
export const createShow = async (showData: IShow) => {
    const seatLayout = generateSeatLayout();
    const showToCreate = { ...showData, seatLayout };

    return await ShowModel.create(showToCreate);
}

// 2. get shows by movie date and location
export const getShowsByMovieDateLocation = async (movieId: string, date: string, location: string) => {
    if (!Types.ObjectId.isValid(movieId)) {
        return [];
    }
    const query: any = {
        movie: new Types.ObjectId(movieId),
        location: { $regex: new RegExp(location, 'i') },
    }

    if (date) {
        query.date = date;
    }

    const shows = await ShowModel.find(query)
        .populate("movie theater")
        .sort({ startTime: 1 });

    const groupedShows = groupShowsByTheater(shows);
    return groupedShows;
}

// 3. get show by id
export const getShowById = async (showId: string) => {
    if (!Types.ObjectId.isValid(showId)) {
        return null;
    }
    return await ShowModel.findById(showId).populate("movie theater");
};

// 4. update multiple seats status
export const updateMultipleSeatsStatus = async (
    showId: string,
    seatKeys: string[], // Format: ["A-1", "A-2"]
    status: "AVAILABLE" | "BOOKED" | "BLOCKED"
) => {
    const operations = seatKeys.map(key => {
        const [row, number] = key.split("-");
        return ShowModel.updateOne(
            { _id: new Types.ObjectId(showId), "seatLayout.row": row },
            {
                $set: {
                    "seatLayout.$.seats.$[elem].status": status,
                },
            },
            {
                arrayFilters: [{ "elem.number": parseInt(number) }],
            }
        );
    });

    return await Promise.all(operations);
}

// 5. get all shows (for the theatre shows page)
export const getAllShows = async (location: string) => {
    const query: any = {};
    if (location) {
        query.location = { $regex: new RegExp(location, 'i') };
    }

    const shows = await ShowModel.find(query)
        .populate("movie theater")
        .sort({ startTime: 1 });

    return shows;
}
