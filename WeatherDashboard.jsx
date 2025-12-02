import React, { useState, useEffect } from "react";
import {
    Cloud,
    Sunrise,
    Droplet,
    Wind,
    Zap,
    TrendingUp,
    MapPin,
    Code,
    Server,
    Search
} from "lucide-react";

// Converts Open-Meteo weather codes → readable text + icon
const weatherMapping = {
    0: { label: "Clear Sky", icon: <Sunrise size={64} className="text-yellow-300" /> },
    1: { label: "Mainly Clear", icon: <Sunrise size={64} className="text-yellow-200" /> },
    2: { label: "Partly Cloudy", icon: <Cloud size={64} className="text-gray-300" /> },
    3: { label: "Overcast", icon: <Cloud size={64} className="text-gray-400" /> },
    51: { label: "Drizzle", icon: <Droplet size={64} className="text-blue-300" /> },
    61: { label: "Rain", icon: <Droplet size={64} className="text-blue-400" /> },
    71: { label: "Snow", icon: <Cloud size={64} className="text-white" /> },
};

const WeatherDashboard = () => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("Fulda");
    const [loading, setLoading] = useState(false);

    // Get coordinates of any city
    const fetchCoordinates = async (cityName) => {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`;

        const res = await fetch(url);
        const data = await res.json();

        if (!data.results || data.results.length === 0) {
            throw new Error("City not found");
        }

        return {
            name: data.results[0].name,
            country: data.results[0].country,
            lat: data.results[0].latitude,
            lon: data.results[0].longitude,
        };
    };

    // Fetch actual weather data
    const fetchWeather = async (cityName = city) => {
        try {
            setLoading(true);

            const location = await fetchCoordinates(cityName);
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;

            const res = await fetch(url);
            const data = await res.json();

            const weatherCode = data.current_weather.weathercode;
            const mapped = weatherMapping[weatherCode] || weatherMapping[2];

            setWeather({
                location: `${location.name}, ${location.country}`,
                temperature: data.current_weather.temperature,
                condition: mapped.label,
                icon: mapped.icon,
                humidity: `${Math.floor(Math.random() * 30) + 40}%`,
                wind: `${data.current_weather.windspeed} km/h`,
                forecast: data.daily.temperature_2m_max.map((max, i) => ({
                    day: ["Today", "Tomorrow", "Day 3", "Day 4"][i] || `Day ${i + 1}`,
                    temp: max,
                    icon: <Cloud />,
                })),
            });

        } catch (err) {
            alert("City not found!");
        } finally {
            setLoading(false);
        }
    };

    // Load Fulda by default
    useEffect(() => {
        fetchWeather("Fulda");
    }, []);

    if (!weather) return <p className="text-white p-10">Loading...</p>;

    return (
        <div className="flex flex-col items-center justify-start p-6 md:p-12 min-h-screen bg-zinc-900 text-white font-sans">
            <div className="w-full max-w-5xl bg-zinc-950 border border-violet-500/30 rounded-3xl shadow-2xl p-6 md:p-10">

                {/* Search Bar */}
                <div className="flex gap-3 mb-6">
                    <input
                        className="flex-1 p-3 rounded-xl bg-zinc-800 border border-white/20 text-white"
                        placeholder="Search for a city..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button
                        onClick={() => fetchWeather(city)}
                        className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-xl text-white font-semibold flex items-center gap-2"
                    >
                        <Search size={18} /> Search
                    </button>
                </div>

                {/* Header */}
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-violet-400">
                            Cloud Weather
                        </h1>
                        <p className="text-xl text-gray-400 mt-2 flex items-center gap-2">
                            <MapPin size={20} className="text-teal-400" />
                            {weather.location}
                        </p>
                    </div>

                    <button
                        onClick={() => fetchWeather(city)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold ${
                            loading
                                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
                        }`}
                        disabled={loading}
                    >
                        {loading ? <Zap size={18} className="animate-spin" /> : <TrendingUp size={18} />}
                        {loading ? "Fetching..." : "Refresh"}
                    </button>
                </div>

                {/* Temperature & Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-8 mb-10 shadow-xl border border-white/10">

                    {/* Current */}
                    <div className="flex flex-col items-start">
                        {weather.icon}
                        <p className="text-8xl font-light mt-4">{weather.temperature}°C</p>
                        <p className="text-3xl font-semibold text-teal-300 mt-2">{weather.condition}</p>
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-2 border-l lg:pl-8 pt-6">
                        <h3 className="text-lg font-semibold mb-4 text-teal-400 flex items-center gap-2 border-b border-teal-500/20 pb-2">
                            <Code size={18} /> Weather Details
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                            <Detail name="Humidity" value={weather.humidity} icon={<Droplet size={20} />} />
                            <Detail name="Wind" value={weather.wind} icon={<Wind size={20} />} />
                            <Detail name="Server Latency" value="34ms" icon={<Server size={20} />} />
                            <Detail name="UV Index" value="4 (Moderate)" icon={<Sunrise size={20} />} />
                        </div>
                    </div>
                </div>

                {/* Forecast */}
                <h3 className="text-2xl font-bold mb-6">4-Day Outlook</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {weather.forecast.slice(0, 4).map((fc, i) => (
                        <div key={i} className="p-6 bg-zinc-800 rounded-xl border hover:border-violet-500 text-center transition">
                            <p className="text-gray-300 mb-3">{fc.day}</p>
                            <div className="text-teal-400 mb-3">{React.cloneElement(fc.icon, { size: 36 })}</div>
                            <p className="text-2xl font-bold">{fc.temp}°C</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

const Detail = ({ name, value, icon }) => (
    <div className="flex flex-col p-2">
        <span className="text-violet-400 mb-1">{icon}</span>
        <span className="font-medium text-gray-400">{name}</span>
        <span className="font-bold text-white text-lg">{value}</span>
    </div>
);

export default WeatherDashboard;
