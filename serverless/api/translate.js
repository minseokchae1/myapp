export default async function handler(req, res) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  console.log("🔥 API KEY:", apiKey); // Vercel 로그에서 확인 가능

  if (!apiKey) {
    return res.status(500).json({ error: "Missing API key" });
  }

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Incheon&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();
    res.status(200).json({
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    });
  } catch (err) {
    console.error("🔥 Weather fetch error:", err); // 이 부분도 로그에 찍힘
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}

