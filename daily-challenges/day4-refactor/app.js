// API_KEY comes from config.js (git-ignored), loaded before this file.
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const HTTP_NOT_FOUND = 404;
const HTTP_UNAUTHORIZED = 401;
const HISTORY_KEY = "recent";
const MAX_HISTORY = 5;
const HIDDEN_CLASS = "hidden";

const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");
const searchHistory = document.getElementById("search-history");

const fields = {
    cityName: document.getElementById("city-name"),
    temperature: document.getElementById("temperature"),
    description: document.getElementById("description"),
    feelsLike: document.getElementById("feels-like"),
    humidity: document.getElementById("humidity"),
    wind: document.getElementById("wind"),
    pressure: document.getElementById("pressure"),
};
const weatherIcon = document.getElementById("weather-icon");

// One helper replaces four near-identical show/hide functions.
function setVisible(element, isVisible) {
    element.classList.toggle(HIDDEN_CLASS, !isVisible);
}

function buildUrl(city) {
    return `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
}

// Turns an HTTP status into a message a person can understand.
function errorForStatus(status) {
    if (status === HTTP_NOT_FOUND) {
        return new Error("City not found.");
    }
    if (status === HTTP_UNAUTHORIZED) {
        return new Error("Invalid API key.");
    }
    return new Error("Failed to fetch weather.");
}

// fetch() itself only rejects with a TypeError when the network is down.
function messageForError(err) {
    return err.name === "TypeError" ? "Network problem. Check your connection." : err.message;
}

async function getWeather(city) {
    try {
        setVisible(loading, true);
        setVisible(weatherDisplay, false);
        setVisible(error, false);

        const response = await fetch(buildUrl(city));
        if (!response.ok) {
            throw errorForStatus(response.status);
        }

        displayWeather(await response.json());
        saveToHistory(city);
    } catch (err) {
        error.textContent = messageForError(err);
        setVisible(error, true);
    } finally {
        setVisible(loading, false);
    }
}

function displayWeather(data) {
    const [condition] = data.weather;
    fields.cityName.textContent = `${data.name}, ${data.sys.country}`;
    fields.temperature.textContent = `${Math.round(data.main.temp)}°C`;
    fields.description.textContent = condition.description;
    fields.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    fields.humidity.textContent = `${data.main.humidity}%`;
    fields.wind.textContent = `${data.wind.speed} m/s`;
    fields.pressure.textContent = `${data.main.pressure} hPa`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;
    setVisible(weatherDisplay, true);
}

function loadHistory() {
    try {
        const saved = JSON.parse(localStorage.getItem(HISTORY_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch {
        // Corrupted storage should not break the app.
        return [];
    }
}

// Newest first, no duplicates, capped at MAX_HISTORY.
function saveToHistory(city) {
    const others = loadHistory().filter((c) => c.toLowerCase() !== city.toLowerCase());
    const updated = [city, ...others].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    renderHistory();
}

function renderHistory() {
    searchHistory.replaceChildren();
    loadHistory().forEach((city) => {
        const li = document.createElement("li");
        li.textContent = city;
        li.addEventListener("click", () => {
            cityInput.value = city;
            getWeather(city);
        });
        searchHistory.appendChild(li);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

renderHistory();
