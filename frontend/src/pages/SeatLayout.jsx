import { useState, useMemo } from "react";
import Header from "../components/seat-layout/Header";
import Footer from "../components/seat-layout/Footer";
import { useParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getShowById } from "../apis/index";
import dayjs from "dayjs";

const Seat = ({ seat, row, isSelected, onToggle }) => {
    return (
        <button
            onClick={() => seat.status === "AVAILABLE" && onToggle(seat, row)}
            className={`w-9 h-9 rounded-md border text-[11px] font-bold transition-all duration-200 flex items-center justify-center
                ${seat.status === "BOOKED"
                    ? "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed"
                    : isSelected
                        ? "bg-[#9b59b6] text-white border-[#9b59b6] shadow-purple-200 shadow-lg scale-105"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#9b59b6] hover:text-[#9b59b6] cursor-pointer"
                }`}
            disabled={seat.status === "BOOKED"}
        >
            {seat.status === "BOOKED" ? "x" : seat.number}
        </button>
    );
};

const SeatLayout = () => {
    const { showId } = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);

    const {
        data: showData,
        isLoading,
    } = useQuery({
        queryKey: ["show", showId],
        queryFn: async () => await getShowById(showId),
        placeholderData: keepPreviousData,
        enabled: !!showId,
        select: (res) => res.data,
    });

    const getPriceByRow = (row) => {
        const rowChar = row.toUpperCase();
        if (['A', 'B', 'C'].includes(rowChar)) return 10;
        if (['D', 'E', 'F'].includes(rowChar)) return 15;
        if (['G', 'H'].includes(rowChar)) return 20;
        return 10; // Default
    };

    const handleSeatToggle = (seat, row) => {
        const seatKey = `${row}-${seat.number}`;
        const price = getPriceByRow(row);
        setSelectedSeats((prev) => {
            if (prev.find(s => s.key === seatKey)) {
                return prev.filter(s => s.key !== seatKey);
            } else {
                return [...prev, { ...seat, row, key: seatKey, price }];
            }
        });
    };

    // Mock dates for the scheduling bar
    const dates = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) => dayjs().add(i, 'day'));
    }, []);

    if (isLoading) return <div className="h-screen flex items-center justify-center text-gray-400 font-medium">Loading selection...</div>;

    return (
        <div className="flex flex-col h-screen bg-white font-sans overflow-hidden">
            <Header showData={showData} />

            {/* Interactive Scheduling Bar */}
            <div className="bg-white border-b border-gray-50 py-4 shadow-sm z-10 overflow-x-auto no-scrollbar">
                <div className="max-w-7xl mx-auto px-6 flex items-center gap-6">
                    <div className="flex gap-4">
                        {dates.map((date, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedDateIndex(idx)}
                                className={`flex flex-col items-center min-w-[60px] py-2 rounded-xl transition-all
                                    ${selectedDateIndex === idx
                                        ? "bg-[#9b59b6] text-white shadow-md shadow-purple-100"
                                        : "hover:bg-gray-50 text-gray-500"}`}
                            >
                                <span className="text-[10px] uppercase font-bold tracking-tighter opacity-70">{date.format("ddd")}</span>
                                <span className="text-sm font-black">{date.format("DD")}</span>
                                <span className="text-[10px] uppercase font-bold tracking-tighter opacity-70">{date.format("MMM")}</span>
                            </button>
                        ))}
                    </div>

                    <div className="h-10 w-[1px] bg-gray-100"></div>

                    <button className="flex flex-col items-center px-8 py-2 rounded-xl border-2 border-[#9b59b6] bg-purple-50 group transition-all">
                        <span className="text-sm font-black text-[#9b59b6] uppercase">{showData?.startTime || "04:00 PM"}</span>
                        <span className="text-[9px] font-black text-[#9b59b6]/60 tracking-widest leading-tight uppercase group-hover:text-[#9b59b6]">
                            {showData?.audioType || "IMAX"} 2D
                        </span>
                    </button>
                </div>
            </div>

            <main className="flex-1 overflow-y-auto px-4 md:px-8 py-10 no-scrollbar bg-gray-50/30">
                <div className="max-w-5xl mx-auto flex flex-col items-center">

                    {/* Seating Grid */}
                    <div className="w-full space-y-12 mb-20">
                        {Object.entries(
                            showData?.seatLayout.reduce((acc, curr) => {
                                if (!acc[curr.type]) acc[curr.type] = { price: curr.price, rows: [] };
                                acc[curr.type].rows.push(curr);
                                return acc;
                            }, {}) || {}
                        ).map(([type, { price, rows }]) => (
                            <div key={type} className="w-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] whitespace-nowrap">
                                        {type} : ₹{getPriceByRow(rows[0].row)}
                                    </h3>
                                    <div className="h-[1px] flex-grow bg-gray-100"></div>
                                </div>

                                <div className="space-y-3">
                                    {rows.map((rowObj) => (
                                        <div key={rowObj.row} className="flex items-center gap-6 justify-center">
                                            <div className="w-8 text-xs font-black text-gray-300 uppercase text-center">{rowObj.row}</div>
                                            <div className="flex gap-2.5">
                                                {rowObj.seats.map((seat, i) => (
                                                    <Seat
                                                        key={`${rowObj.row}-${seat.number}`}
                                                        seat={{ ...seat, price }}
                                                        row={rowObj.row}
                                                        isSelected={!!selectedSeats.find(s => s.key === `${rowObj.row}-${seat.number}`)}
                                                        onToggle={handleSeatToggle}
                                                    />
                                                ))}
                                            </div>
                                            <div className="w-8 md:block hidden opacity-0"></div> {/* Spacer for offset */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Perspective-Warped Screen Visualization */}
                    <div className="w-full flex flex-col items-center mb-10">
                        <p className="text-[11px] font-black text-[#9b59b6] tracking-[0.7em] uppercase mb-4 opacity-50">SCREEN THIS WAY</p>

                        {/* Perspective Screen Shape */}
                        <div className="relative w-full max-w-2xl px-10 h-10">
                            <div className="absolute inset-x-0 top-0 h-4 bg-[#9b59b6]/5 rounded-[50%] blur-xl"></div>
                            <svg className="w-full h-full drop-shadow-[0_15px_15px_rgba(155,89,182,0.1)]" viewBox="0 0 400 20">
                                <path
                                    d="M20,0 L380,0 C385,0 390,5 375,15 L25,15 C10,5 15,0 20,0 Z"
                                    fill="none"
                                    stroke="#9b59b6"
                                    strokeWidth="1.5"
                                    strokeOpacity="0.4"
                                />
                                <defs>
                                    <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#9b59b6" stopOpacity="0.1" />
                                        <stop offset="100%" stopColor="#9b59b6" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path d="M20,0 L380,0 L375,15 L25,15 Z" fill="url(#screenGrad)" />
                            </svg>
                        </div>
                    </div>

                    {/* Global Legend */}
                    <div className="flex gap-12 text-[10px] font-black text-gray-400 tracking-widest uppercase items-center py-6">
                        <div className="flex items-center gap-3 group">
                            <div className="w-5 h-5 rounded-md border border-gray-200 bg-white shadow-sm transition-transform group-hover:scale-110"></div>
                            <span>Available</span>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="w-5 h-5 rounded-md bg-gray-100 flex items-center justify-center text-[10px] text-gray-300 transition-transform group-hover:scale-110">x</div>
                            <span>Occupied</span>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="w-5 h-5 rounded-md bg-[#9b59b6] shadow-lg shadow-purple-100 transition-transform group-hover:scale-110"></div>
                            <span className="text-[#9b59b6]">Selected</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Standardized Footer */}
            <div className="h-[100px]">
                <Footer selectedSeats={selectedSeats} showData={showData} />
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default SeatLayout;