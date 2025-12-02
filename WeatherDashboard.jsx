import React, { useState, useEffect } from 'react';
import { Cloud, Sunrise, Droplet, Wind, Zap, TrendingUp, MapPin, Code, Server } from 'lucide-react';

const mockWeatherData = {
    location: "Fulda, Germany",
    temperature: 18,
    condition: "Partly Cloudy",
    icon: <Cloud size={64} className="text-blue-300" />,
    details: [
        { name: "Humidity", value: "65%", icon: <Droplet size={20} /> },
        { name: "Wind Speed", value: "12 km/h", icon: <Wind size={20} /> },
        { name: "UV Index", value: "4 (Moderate)", icon: <Sunrise size={20} /> },
        // Including System Metrics as requested
        { name: "Server Latency", value: "34ms", icon: <Server size={20} /> }, 
    ],
    forecast: [
        { day: "Today", temp: 20, icon: <Cloud /> },
        { day: "Wed", temp: 22, icon: <Sunrise /> },
        { day: "Thu", temp: 15, icon: <Droplet /> },
        { day: "Fri", temp: 18, icon: <Wind /> },
    ]
};

const WeatherDashboard = () => {
    const [data, setData] = useState(mockWeatherData);
    const [loading, setLoading] = useState(false);

    // Simulate data fetch latency to demonstrate asynchronous API use
    const fetchWeather = () => {
        setLoading(true);
        setTimeout(() => {
            // Update the temperature slightly on refresh to show reactivity
            const newTemp = data.temperature + (Math.random() > 0.5 ? 1 : -1);
            setData(prev => ({ ...prev, temperature: newTemp }));
            setLoading(false);
        }, 800);
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <div className="flex flex-col items-center justify-start p-6 md:p-12 min-h-screen bg-zinc-900 text-white font-sans">
            <div className="w-full max-w-5xl bg-zinc-950 border border-violet-500/30 rounded-3xl shadow-2xl shadow-violet-900/10 p-6 md:p-10">
                
                {/* Header & Location */}
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-violet-400">
                            Cloud Weather
                        </h1>
                        <p className="text-xl text-gray-400 mt-2 flex items-center gap-2">
                            <MapPin size={20} className="text-teal-400" />
                            {data.location}
                        </p>
                    </div>
                    <button 
                        onClick={fetchWeather}
                        className={`flex items-center gap-2 px-6 py-3 text-base rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 ${
                            loading 
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg shadow-violet-500/30'
                        }`}
                        disabled={loading}
                    >
                        {loading 
                            ? <Zap size={18} className="animate-spin" /> 
                            : <TrendingUp size={18} />}
                        {loading ? 'Fetching...' : 'Refresh Data'}
                    </button>
                </div>

                {/* Main Temperature and Details Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-8 mb-10 shadow-xl border border-white/10">
                    
                    {/* Current Condition (Column 1 - Wide) */}
                    <div className="lg:col-span-1 flex flex-col items-start justify-center pb-6 lg:pb-0">
                        {data.icon}
                        <p className="text-8xl font-light tracking-tighter mt-4">{data.temperature}°C</p>
                        <p className="text-3xl font-semibold text-teal-300 mt-2">{data.condition}</p>
                    </div>
                    
                    {/* Details Metrics (Column 2 & 3 - Grid) */}
                    <div className="lg:col-span-2 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-8">
                        <h3 className="text-lg font-semibold mb-4 text-teal-400 flex items-center gap-2 border-b border-teal-500/20 pb-2">
                            <Code size={18} /> Weather Details & System Metrics
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 text-sm text-gray-300">
                            {/* We loop through the combined weather and system details */}
                            {data.details.map((detail, index) => (
                                <div key={index} className="flex flex-col items-start p-2 rounded-md transition-colors">
                                    <span className="text-violet-400 mb-1">{detail.icon}</span>
                                    <span className="font-medium text-gray-400">{detail.name}</span>
                                    <span className="font-bold text-white text-lg">{detail.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4-Day Forecast (Styled as cards) */}
                <h3 className="text-2xl font-bold text-white mb-6">4-Day Outlook</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {data.forecast.map((item, index) => (
                        <div key={index} className="text-center p-6 bg-zinc-800 rounded-xl border-2 border-transparent hover:border-violet-500 transition-all duration-300 shadow-lg group">
                            <p className="text-base font-semibold text-gray-300 mb-3 group-hover:text-white transition-colors">{item.day}</p>
                            <div className="text-teal-400 mx-auto w-fit mb-3 group-hover:scale-110 transition-transform">
                                {React.cloneElement(item.icon, { size: 36 })}
                            </div>
                            <p className="text-2xl font-extrabold text-white">{item.temp}°C</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default WeatherDashboard;