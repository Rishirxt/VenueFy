import { useNavigate } from "react-router-dom";

const Footer = ({ selectedSeats = [], showData }) => {
    const navigate = useNavigate();
    const isSelected = selectedSeats.length > 0;
    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const seatNumbers = selectedSeats.map(s => `${s.row}${s.number}`).join(", ");

    const handleProceed = () => {
        navigate("/checkout", { state: { selectedSeats, showData } });
    };

    return (
        <div className="h-full bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-8 py-4">
                {isSelected ? (
                    <>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Selected Seats</span>
                            <span className="text-sm font-bold text-gray-700 truncate max-w-[200px] md:max-w-md">
                                {seatNumbers}
                            </span>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Total Payable</span>
                                <span className="text-xl font-black text-gray-800">₹{totalPrice}</span>
                            </div>
                            <button
                                onClick={handleProceed}
                                className="bg-[#f84464] cursor-pointer text-white px-12 py-3 rounded-lg font-bold shadow-lg hover:bg-[#d63a56] transition-all transform active:scale-95"
                            >
                                Proceed
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="w-full flex flex-col items-center">
                        <div className="flex gap-10">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded border border-gray-300 bg-white shadow-sm"></div>
                                <span className="text-xs font-medium text-gray-500">Available</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-[#9b59b6] shadow-sm"></div>
                                <span className="text-xs font-medium text-gray-500">Selected</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-gray-200 shadow-sm"></div>
                                <span className="text-xs font-medium text-gray-500">Sold</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Footer;