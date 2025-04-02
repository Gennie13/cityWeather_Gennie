"use client"
import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Droplets, Search, Wind,Thermometer} from "lucide-react"
import { getWeatherData } from "./action";
import { useState } from "react";
import { WeatherData } from "../../types/weather";
import { Card, CardContent} from "@/components/ui/card"
import { error } from "console";
import { useFormStatus } from "react-dom";

function SubmitBtn (){
  const {pending} = useFormStatus();
  return(
    <Button className="rounded-full bg-blue-50 text-blue-600 cursor-pointer" type="submit" disabled={pending}>
      <Search className="w-4 h-4 my-1"/>
    </Button>
  )
}
export default function Home() {

  const [weather, setWeather] = useState<WeatherData | null> (null)
  const [city, setCity] = useState("Ulaanbaatar")
  const [error, setError] = useState("")

  const handleSearch = async (formData:FormData) => {
    const city = formData.get("city") as string
    const {data, error:weatherError} = await getWeatherData(city)
    
    if(data) {
      setWeather(data);
      setError("")
    }
    if(weatherError)
      setError(weatherError)
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300  to-blue-500 p-4 flex items-center justify-center">

      <div className="w-full flex flex-col items-center max-w-md space-y-4">
        <form action={handleSearch} className="flex gap-2 items-center w-1/2">
          <input type="text" name="city" placeholder="Аймаг оруулна уу" className="rounded-2xl bg-white/90 bg-gradient-to-t from-blue-300 to-white border-b-1 border-blue-400 pl-2 py-2" required/>
          <SubmitBtn/>

        </form>
        {
          error && (
            <div className="text-red-600 font-bold ">{error}</div>
          )
        }
        {
          weather && (
            <div>
              <Card className="bg-white/40 backdrop-blur">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                  <h2 className="  font-bold">{weather.name}</h2>
                  <div className="flex items-center justify-center gap-2 font-bold mt-2">
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} width={64} height={64} />
                    <div className="text-5xl font-bold">{Math.round(weather.main.temp)}<sup>o</sup>C
                    </div>
                  </div>
                  <div className="text-gray-500 mt-1 capitalize">
                    {weather.weather[0].description}
                  </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <Thermometer className="w-6 h-6 mx-auto text-orange-500"/>
                      <div className="mt-2 text-sm text-gray-500">Температур</div>
                      <div className="font-semibold">
                      {Math.round(weather.main.feels_like)}<sup>o</sup>C
                      </div>
                    </div>
                    <div className="text-center">
                      <Droplets className="w-6 h-6 mx-auto text-orange-500"/>
                      <div className="mt-2 text-sm text-gray-500">Чийгшил</div>
                      <div className="font-semibold">
                      {Math.round(weather.main.huminity)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <Wind className="w-6 h-6 mx-auto text-orange-500"/>
                      <div className="mt-2 text-sm text-gray-500">Салхины хурд</div>
                      <div className="font-semibold">
                      {Math.round(weather.main.temp)}м/с
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        }
      </div>
    </div>
  );
}
