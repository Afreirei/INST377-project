# Sunny Days

INST377 Project

Title: Sunny Days - The weather based calendar app
Description: Sunny Days is a calendar app website that uses weather forecast data from the Open-Meteo API to give users informed desicions on when they should schedule activities in the week. 
Target Browsers: This app targets web browsers like Chrome, Edge, Firefox, etc. 

[Developer Manual](#developer-manual)




📄 Developer Manual,

Installation Instructions,
This is a front-end only project. No installation is required:

Clone this repository or download the ZIP.,
Open index.html in your browser.,
All logic is handled client-side using JavaScript and external APIs.,

Deployment Instructions,
To deploy this project:
Use Vercel or GitHub Pages.,
No build step or server required — it’s a static HTML project.,

API Usage,
Open-Meteo API is used to get the weather forecast using user geolocation.,
Supabase is used as a real-time backend for storing event data.,

Developer Notes,
Uses FullCalendar.js for dynamic calendar rendering.,
Uses Day.js for date/time handling.,
All APIs are loaded via CDN.,
Events and weather are displayed together for full UX.,

Known Bugs,
- Adding events to the calendar will convert the input time to UTC. This should be fixed by changing the default timezone for the Supabase database to your preferred time zone. 
- Adding a calendar event will add the event for all site visitors. Treat this like a public use calendar for now until this is resolved.
- 

---

✅ Extra Credit Features,
Custom CSS animations on buttons and transitions,
Full calendar with weather icon overlays,
Real-time API data shown to the user,

---

💻 Author,
Built by Vincent Park and Ari Freireich as a part of INST377.
Contact: [Your GitHub Name or Email]
