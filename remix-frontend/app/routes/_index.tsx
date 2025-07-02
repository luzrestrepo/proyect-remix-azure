import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Weather Forecast App" }];
};

type Weather = {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
};

export const loader = async () => {
  const response = await fetch("http://backend:80/weatherforecast");
  if (!response.ok) {
    throw new Error("Error fetching weather data");
  }
  return await response.json();
};

const getWeatherIcon = (summary: string) => {
  const lowercaseSummary = summary.toLowerCase();
  if (lowercaseSummary.includes("sun") || lowercaseSummary.includes("hot")) return "☀️";
  if (lowercaseSummary.includes("rain")) return "🌧️";
  if (lowercaseSummary.includes("cloud")) return "☁️";
  if (lowercaseSummary.includes("snow") || lowercaseSummary.includes("freezing")) return "❄️";
  return "🌤️";
};

export default function Index() {
  const data = useLoaderData<Weather[]>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Weather Forecast
          </h1>
          <p className="text-lg text-gray-600">
            Your 5-day weather outlook
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl" role="img" aria-label="weather">
                    {getWeatherIcon(item.summary)}
                  </span>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xl font-semibold text-gray-800">
                    {item.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-indigo-600">
                        {item.temperatureC}°C
                      </span>
                      <span className="text-gray-500">|</span>
                      <span className="text-lg text-gray-600">
                        {item.temperatureF}°F
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


