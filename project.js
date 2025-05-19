const SUPABASE_URL = 'https://deaaptubopupaiomsflm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlYWFwdHVib3B1cGFpb21zZmxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MDk0NDUsImV4cCI6MjA2MzE4NTQ0NX0.-CufEOKSu9pXATNiWiSYV3ZkaaWq65Y6VV4piCxzUPQ';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const pages = {
    home: document.getElementById("home"),
    event: document.getElementById("event"),
    about: document.getElementById("about")
};

function showPage(id) {
    for (const key in pages) {
        const page = pages[key];
        if (key === id) {
          page.style.display = "block";
          requestAnimationFrame(() => page.classList.add("active"));
        } else {
          page.classList.remove("active");
          setTimeout(() => page.style.display = "none", 500);
        }
    }

        if (id === "home") renderCalendar();
}

async function fetchEvents() {
    const { data, error } = await supabase.from('events').select('*');
    if (error) {
        console.error("Error fetching events:", error);
        return [];
    }
    return data;
}

function getWeatherIcon(code) {
    const icons = {
        0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
        45: "🌫️", 48: "🌫️", 51: "🌦️", 53: "🌦️", 55: "🌦️",
        61: "🌧️", 63: "🌧️", 65: "🌧️",
        71: "🌨️", 73: "🌨️", 75: "🌨️",
        80: "🌦️", 81: "🌦️", 82: "🌦️",
        95: "⛈️", 96: "⛈️", 99: "⛈️"
    };
    return icons[code] || "❓";
}

async function renderCalendar() {
    const calendarEl = document.getElementById("calendar");
    calendarEl.innerHTML = "";

    const events = await fetchEvents();
    navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const now = new Date();
        const startDate = dayjs(now).startOf('month').format("YYYY-MM-DD");
        const endDate = dayjs(now).endOf('month').format("YYYY-MM-DD");

        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&temperature_unit=fahrenheit&timezone=auto&start_date=${startDate}&end_date=${endDate}`);
        const weatherData = await weatherRes.json();

        const weatherEvents = weatherData.daily.time.map((date, i) => {
          const min = weatherData.daily.temperature_2m_min[i];
          const max = weatherData.daily.temperature_2m_max[i];
          const code = weatherData.daily.weathercode[i];
          const icon = getWeatherIcon(code);
            return {
                title: `${icon} ${min}°F - ${max}°F`,
                start: date,
                allDay: true
            };
        });

        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            events: [
                ...events.map(e => ({
                title: e.name,
                start: e.start_time,
                end: e.end_time
                })),
                ...weatherEvents
            ],
            height: 500
        });

        calendar.render();
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const now = new Date().toISOString().slice(0, 16);
    document.getElementById("eventStart").value = now;
    document.getElementById("eventEnd").value = now;

    navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&temperature_unit=fahrenheit`);
        const data = await res.json();
        const temp = data.hourly?.temperature_2m?.[0];
        document.getElementById("forecast").textContent = temp ? `Current temperature: ${temp}°F` : "Unable to load temperature.";
        renderCalendar();
    });
});

document.getElementById("eventForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("eventName").value;
    const start = document.getElementById("eventStart").value;
    const end = document.getElementById("eventEnd").value;
    const forecastOutput = document.getElementById("eventForecast");

    if (new Date(start) >= new Date(end)) {
        forecastOutput.style.color = "red";
        forecastOutput.textContent = "Start time must be before end time.";
        return;
    }

    const { error } = await supabase.from('events').insert([
        { name, start_time: start, end_time: end }
    ]);

    if (error) {
        forecastOutput.style.color = "red";
        forecastOutput.textContent = "Failed to save event: " + error.message;
        return;
    }

    forecastOutput.style.color = "green";
    forecastOutput.textContent = `✅ Event "${name}" saved!`;

    document.getElementById("eventForm").reset();
    const now = new Date().toISOString().slice(0, 16);
    document.getElementById("eventStart").value = now;
    document.getElementById("eventEnd").value = now;

    renderCalendar();
});