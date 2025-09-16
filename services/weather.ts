export interface WeatherData {
    temperature: number;
    condition: string;
    icon: string;
    city: string;
}

// This function simulates fetching weather data from an API.
// To keep things simple and avoid needing an API key for this demo,
// we are returning a hardcoded value.
export const getWeather = async (city: string = "Seoul"): Promise<WeatherData> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real application, you would make an API call here.
    // This is mock data for demonstration purposes.
    return {
        temperature: 24,
        condition: "맑음",
        icon: "☀️",
        city: "서울",
    };
};
