"use server"

import { WeatherData } from "../../types/weather";

export async function getWeatherData(city:string): Promise<{
    data?:WeatherData
    error?: string
    }> {
    try {
        if(!city.trim())
            return {error: "Хайх нэрээ оруулна уу..."}
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`)
        if(!res.ok) {
            const errorData = await res.json()
            return {error: "Нэрээ дахиж оруулна уу..."}
        }
        const data:WeatherData = await res.json();
        return {data}
        
    } catch(err) {
        console.log(err)
        return{
            error: "Алдаа гарлаа түр хүлээнэ үү..."
        }
    }
} 