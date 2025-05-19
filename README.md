# Sunny Days

INST377 Project

Title: Sunny Days - The weather based calendar app
Description: Sunny Days is a calendar app website that uses weather forecast data from the Open-Meteo API to give users informed desicions on when they should schedule activities in the week. 
Target Browsers: This app targets web browsers like Chrome, Edge, Firefox, etc. 

[Developer Manual](#developer-manual)




#  📄 Developer Manual,

Installation Instructions, 

This is a front-end only project. No installation is necessary:

1. Clone this repo or download ZIP.
2. Open index.html in a browser.
3. All client-side with JavaScript and external APIs.

Deployment Instructions 

To deploy this project:
- Use Vercel or GitHub Pages.
- No build step or server needed, it's a static HTML project. 

API Usage 

- **Open-Meteo** API is used to get the weather forecast by user geolocation.
- **Supabase** is used as a real-time backend for storing event data.

Developer Notes

- Utilizes FullCalendar.js for dynamic calendar rendering.
- Utilizes Day.js for date/time manipulation.
- All APIs fetched through CDN.
- Events and weather are rendered together for a full UX.

Known Bugs

- Adding a calendar event will add the event for all site visitors. Treat this like a public use calendar for now until this is resolved.
- No way to remove calendar events at the moment.
- Calendar events will only show the start time on the calendar. End time is recorded, but not shown.

✅ Extra Credit Features

- Custom CSS animations on buttons and transitions,
- Full calendar with weather icon overlays,
- Real-time API data shown to the user,

💻 Author

Built by Vincent Park and Ari Freireich as a part of INST377. Contact: [Vince373, Afreirei] 
