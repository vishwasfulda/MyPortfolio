import React, { useState, useEffect } from 'react';
import { Cloud, Sunrise, Droplet, Wind, Zap, TrendingUp, MapPin, Code, Server, Search, AlertTriangle, CloudSun, Sunset, Thermometer } from 'lucide-react';

// --- API Configuration (SWITCHED TO OPEN-METEO/GEOCODING - KEYLESS) ---
const GEOCODING_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_BASE_URL = "https://api.open-meteo.com/v1/forecast"; 
const INITIAL_CITY = "Fulda"; // Default city to load

// --- Utility Functions ---

// Function to map WMO Weather Codes (Open-Meteo) to Lucide React icons
const getWeatherIcon = (wmoCode) => {
    // Simplified mapping based on WMO codes for current weather
    if (wmoCode >= 95) return <Zap size={64} className="text-yellow-400" />; // Thunderstorm
    if (wmoCode >= 80 && wmoCode <= 82) return <Droplet size={64} className="text-blue-500" />; // Rain showers
    if (wmoCode >= 71 && wmoCode <= 75) return <Cloud size={64} className="text-gray-300" />; // Snow fall
    if (wmoCode === 0) return <Sunrise size={64} className="text-yellow-300" />; // Clear Sky
    if (wmoCode >= 1 && wmoCode <= 3) return <CloudSun size={64} className="text-blue-400" />; // Cloudy/Partly Cloudy
    if (wmoCode >= 45 && wmoCode <= 48) return <Wind size={64} className="text-gray-400" />; // Fog/Mist/Rime
    return <AlertTriangle size={64} className="text-red-500" />; // Default/Error
};

const WeatherDashboard = () => {
    
    // --- Mock Data (for forecast/system metrics) ---
    // Kept here for the forecast section which this API does not easily support without complex indexing
    const mockForecast = [
        { day: "Today", temp: 20, icon: <Cloud /> },
        { day: "Wed", temp: 22, icon: <Sunrise /> },
        { day: "Thu", temp: 15, icon: <Droplet /> },
        { day: "Fri", temp: 18, icon: <Wind /> },
    ];
    
    // Mock system metrics are kept as they demonstrate cloud architecture awareness.
    const systemMetrics = {
        name: "Server Latency",
        value: "28ms", 
        icon: <Server size={20} />
    };

    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState(INITIAL_CITY); 
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // --- Geocoding Function ---
    const fetchGeocoding = async (city) => {
        const geoUrl = `${GEOCODING_BASE_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const response = await fetch(geoUrl);
        const data = await response.json();
        
        if (!data.results || data.results.length === 0) {
            throw new Error("City not found. Please try a different name.");
        }
        
        const result = data.results[0];
        return {
            latitude: result.latitude,
            longitude: result.longitude,
            displayName: `${result.name}, ${result.country}`,
            timezone: result.timezone
        };
    };

    // --- Weather Fetch Logic (Step 2) ---
    const fetchWeatherData = async (city) => {
        setLoading(true);
        setError(null);
        setWeatherData(null);

        try {
            const geoInfo = await fetchGeocoding(city);
            
            // Open-Meteo Fetch Parameters:
            const weatherUrl = `${WEATHER_BASE_URL}?latitude=${geoInfo.latitude}&longitude=${geoInfo.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh&timezone=${geoInfo.timezone}&forecast_days=1`;
            
            const response = await fetch(weatherUrl);
            if (!response.ok) {
                 throw new Error(`Failed to fetch weather data from Open-Meteo.`);
            }

            const data = await response.json();
            
            // --- DATA PARSING ---
            const current = data.current;
            
            const transformedData = {
                location: geoInfo.displayName,
                temperature: Math.round(current.temperature_2m),
                conditionCode: current.weather_code,
                condition: data.current_units.weather_code, // Using units as a placeholder description
                details: [
                    { name: "Feels Like", value: `${Math.round(current.apparent_temperature)}°C`, icon: <Thermometer size={20} /> },
                    { name: "Humidity", value: `${current.relative_humidity_2m}%`, icon: <Droplet size={20} /> },
                    { name: "Wind Speed", value: `${Math.round(current.wind_speed_10m)} km/h`, icon: <Wind size={20} /> },
                    systemMetrics,
                ],
                icon: getWeatherIcon(current.weather_code),
            };
            
            setWeatherData(transformedData);
            setLocation(geoInfo.displayName);

        } catch (err) {
            // Display error from either Geocoding or Weather Fetch
            setError(err.message);
            setWeatherData(null);
        } finally {
            setLoading(false);
            setSearchInput("");
        }
    };

    useEffect(() => {
        // Fetch default location on initial load
        fetchWeatherData(location);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            fetchWeatherData(searchInput.trim());
        }
    };
    
    // Helper function to convert WMO code to a readable description (for the demo)
    const getWmoDescription = (code) => {
        // Source: WMO weather interpretation codes (WW)
        if (code === 0) return 'Clear Sky';
        if (code === 1 || code === 2 || code === 3) return 'Mainly Clear to Cloudy';
        if (code === 45 || code === 48) return 'Fog or Rime Fog';
        if (code >= 51 && code <= 57) return 'Drizzle / Rain';
        if (code >= 61 && code <= 67) return 'Rain / Freezing Rain';
        if (code >= 71 && code <= 77) return 'Snow Fall';
        if (code >= 80 && code <= 82) return 'Rain Showers';
        if (code >= 85 && code <= 86) return 'Snow Showers';
        if (code >= 95) return 'Thunderstorm';
        return 'Data Unavailable';
    };

    return (
        <div className="flex flex-col items-center justify-start p-4 sm:p-6 md:p-12 min-h-screen bg-zinc-900 text-white font-sans">
            <div className="w-full max-w-5xl bg-zinc-950 border border-violet-500/30 rounded-3xl shadow-2xl shadow-violet-900/10 p-4 sm:p-6 md:p-10">
                
                {/* Header & Location */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-violet-400">
                            Real-Time Weather
                        </h1>
                        <p className="text-lg text-gray-400 mt-1 flex items-center gap-2">
                            <MapPin size={18} className="text-teal-400" />
                            {weatherData ? weatherData.location : location}
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex gap-3 mb-8 sm:mb-10 w-full">
                    <input
                        type="text"
                        placeholder="Enter city name (e.g., Berlin, Tokyo)"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="flex-grow p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-teal-400 focus:ring-teal-400 text-white placeholder-gray-500 transition-colors"
                        required
                    />
                    <button 
                        type="submit"
                        className="flex items-center gap-2 px-5 py-3 text-sm rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30"
                        disabled={loading}
                    >
                        {loading ? 'Searching...' : <Search size={18} />}
                    </button>
                </form>

                {/* Loading / Error Display */}
                {loading && (
                    <div className="flex items-center justify-center p-12 bg-zinc-800 rounded-xl text-teal-400">
                        <Zap size={24} className="animate-spin mr-3" /> Fetching real-time weather data...
                    </div>
                )}

                {error && (
                    <div className="flex items-center justify-center p-6 bg-red-900/40 border border-red-700 rounded-xl text-red-300">
                        <AlertTriangle size={20} className="mr-3" /> Error: {error}
                    </div>
                )}
                
                {/* Main Content Card - Renders only if data is available */}
                {weatherData && !loading && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 md:p-8 shadow-xl border border-white/10">
                        
                        {/* Current Condition (Column 1 - Wide) */}
                        <div className="lg:col-span-1 flex flex-col sm:flex-row items-center sm:items-start justify-center pb-4 lg:pb-0 border-b border-white/10 lg:border-b-0">
                            <div className="flex flex-col items-center sm:items-start gap-4 sm:flex-row sm:gap-6">
                                {/* Dynamic Icon Rendering */}
                                {weatherData.icon} 
                                <div>
                                    <p className="text-7xl sm:text-8xl font-light tracking-tighter">{weatherData.temperature}°C</p>
                                    <p className="text-xl sm:text-3xl font-semibold text-teal-300 mt-1 text-center sm:text-left capitalize">{getWmoDescription(weatherData.conditionCode)}</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Details Metrics (Column 2 & 3 - Grid) */}
                        <div className="lg:col-span-2 pt-6 lg:pt-0 lg:border-l border-white/10 lg:pl-8">
                            <h3 className="text-lg font-semibold mb-4 text-teal-400 flex items-center gap-2 border-b border-teal-500/20 pb-2">
                                <Code size={18} /> Weather Details & System Metrics
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-2 text-sm text-gray-300"> 
                                {weatherData.details.map((detail, index) => (
                                    <div key={index} className="flex flex-col items-start p-2 rounded-md transition-colors">
                                        <span className="text-violet-400 mb-1">{detail.icon}</span>
                                        <span className="font-medium text-gray-400 text-xs sm:text-sm">{detail.name}</span>
                                        <span className="font-bold text-white text-lg">{detail.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Forecast Placeholder (Uses mock data moved inside the component) */}
                {!loading && !error && (
                    <>
                        <h3 className="text-xl font-bold text-white mb-4 mt-8">Forecast (Simulated)</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                            {mockForecast.map((item, index) => (
                                <div key={index} className="text-center p-4 sm:p-6 bg-zinc-800 rounded-xl border-2 border-transparent hover:border-violet-500 transition-all duration-300 shadow-lg group">
                                    <p className="text-sm font-semibold text-gray-300 mb-2">{item.day}</p>
                                    <div className="text-teal-400 mx-auto w-fit mb-3 group-hover:scale-110 transition-transform">
                                        {React.cloneElement(item.icon, { size: 30 })}
                                    </div>
                                    <p className="text-xl sm:text-2xl font-extrabold text-white">{item.temp}°C</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default WeatherDashboard;