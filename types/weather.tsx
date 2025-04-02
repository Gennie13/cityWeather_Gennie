
export interface WeatherData {
    name:string,
    main:{
        temp:number,
        huminity:number,
        feels_like:number
    },
    weather: Array<{
        main:string,
        description:string,
        icon:string
    }>,
    wind: {
        speed:number
    }
}