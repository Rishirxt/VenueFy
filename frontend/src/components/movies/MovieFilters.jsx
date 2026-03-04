import React from 'react'

const MovieFilters = ({ selectedFilters, onFilterChange, onClear }) => {
    const languages = ["Hindi", "English", "Bengali", "Punjabi", "Tamil", "Japanese", "Telugu"];
    const genres = ["Action", "Adventure", "Animation", "Comedy", "Drama", "Fantasy", "Horror", "Musical", "Mystery", "Romance", "Sci-Fi", "Thriller"];
    const formats = ["2D", "3D", "IMAX", "4DX", "ICE"];

    const toggleFilter = (type, value) => {
        const current = selectedFilters[type] || [];
        const updated = current.includes(value)
            ? current.filter(item => item !== value)
            : [...current, value];
        onFilterChange(type, updated);
    };
    return (
        <div className='w-full md:w-1/4 p-4 space-y-4'>
            <h2 className='text-2xl font-semibold'>Filters</h2>
            <div className='bg-white p-4 rounded-md min-h-[120px]'>
                <div className='flex justify-between items-center mb-3'>
                    <span className='font-medium'>Languages</span>
                    <button
                        onClick={() => onClear('languages')}
                        className='text-[#f74362] text-sm hover:underline'
                    >
                        Clear
                    </button>
                </div>
                <div className='flex flex-wrap gap-2'>
                    {
                        languages.map((lang, i) => (
                            <span
                                key={i}
                                onClick={() => toggleFilter('languages', lang)}
                                className={`border px-3 py-1 text-sm rounded cursor-pointer transition-colors ${selectedFilters.languages?.includes(lang)
                                    ? 'bg-[#f74362] text-white border-[#f74362]'
                                    : 'border-gray-200 text-[#f74362] hover:bg-gray-100'
                                    }`}
                            >
                                {lang}
                            </span>
                        ))
                    }
                </div>
            </div>
            <div className='bg-white p-4 rounded-md min-h-[120px]'>
                <div className='flex justify-between items-center mb-3'>
                    <span className='font-medium'>Genres</span>
                    <button onClick={() => onClear('genres')} className='text-[#f74362] text-sm hover:underline'>Clear</button>
                </div>
                <div className='flex flex-wrap gap-2'>
                    {genres.map((genre, i) => (
                        <span
                            key={i}
                            onClick={() => toggleFilter('genres', genre)}
                            className={`border px-3 py-1 text-sm rounded cursor-pointer transition-colors ${selectedFilters.genres?.includes(genre)
                                ? 'bg-[#f74362] text-white border-[#f74362]'
                                : 'border-gray-200 text-[#f74362] hover:bg-gray-100'
                                }`}
                        >
                            {genre}
                        </span>
                    ))}
                </div>
            </div>
            <div className='bg-white p-4 rounded-md min-h-[120px]'>
                <div className='flex justify-between items-center mb-3'>
                    <span className='font-medium'>Format</span>
                    <button onClick={() => onClear('formats')} className='text-[#f74362] text-sm hover:underline'>Clear</button>
                </div>
                <div className='flex flex-wrap gap-2'>
                    {formats.map((format, i) => (
                        <span
                            key={i}
                            onClick={() => toggleFilter('formats', format)}
                            className={`border px-3 py-1 text-sm rounded cursor-pointer transition-colors ${selectedFilters.formats?.includes(format)
                                ? 'bg-[#f74362] text-white border-[#f74362]'
                                : 'border-gray-200 text-[#f74362] hover:bg-gray-100'
                                }`}
                        >
                            {format}
                        </span>
                    ))}
                </div>
            </div>
            <button className='w-full border cursor-pointer bg-[#f74362] text-white py-2 rounded hover:bg-[#d73756] transition-colors duration-200'>
                Browse by Cinemas
            </button>
        </div>
    )
}

export default MovieFilters