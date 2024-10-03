const API_KEY = "d9bbf35ee5374ad99f91b80d4530dfa4"; 
const url = "https://newsapi.org/v2/everything?q=";
const triviaUrl = "https://opentdb.com/api.php?amount=5&type=multiple"; // API for random trivia questions

let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// User authentication (mock for simplicity)
const user = {
    name: null,
    authenticated: false,
};

// Inside your script.js file

window.addEventListener("load", () => {
    fetchNews("India");
    document.getElementById("news-span").classList.add("animate");
});


// Reload Page
function reload() {
    location.reload();
}

// Fetch News
function fetchNews(query) {
    fetch(`${url}${query}&apiKey=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => bindData(data.articles));
}

// Bind Data
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

// Fill News Card
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

// Search Functionality
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
 // Toggle menu visibility
        function toggleMenu() {
            const menu = document.getElementById('toggle-menu');
            menu.classList.toggle('hidden');
        }

        // Close the menu
        function closeMenu() {
            const menu = document.getElementById('toggle-menu');
            menu.classList.add('hidden');
        }

        // Add event listener for mobile search button
        document.getElementById("search-button-mobile").addEventListener("click", () => {
            const query = document.getElementById("search-text-mobile").value;
            if (!query) return;
            fetchNews(query);
            closeMenu(); // Close menu after search
        });
        

// Filter by Date
// Filter by Date
function filterByDate() {
    const fromDate = document.getElementById("dateFrom").value;
    const toDate = document.getElementById("dateTo").value;

    if (fromDate && toDate) {
        const formattedFromDate = new Date(fromDate).toISOString(); // Convert to ISO format
        const formattedToDate = new Date(toDate).toISOString();

        fetchNewsWithDate(formattedFromDate, formattedToDate);
    } else {
        alert("Please select both dates.");
    }
}

// Fetch News with Date Range
function fetchNewsWithDate(fromDate, toDate) {
    fetch(`${url}India&from=${fromDate}&to=${toDate}&apiKey=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => bindData(data.articles))
        .catch((error) => {
            console.error("Error fetching news by date:", error);
            alert("Failed to fetch news. Please try again.");
        });
}


// Fetch Random Trivia Questions
async function fetchQuizQuestions() {
    try {
        const response = await fetch(triviaUrl);
        const data = await response.json();
        quizQuestions = data.results.map(question => ({
            question: question.question,
            options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
            answer: question.correct_answer
        }));
        displayQuizQuestions();
    } catch (error) {
        console.error("Error fetching quiz questions:", error);
    }
}

// Display Quiz Questions
function displayQuizQuestions() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";

    quizQuestions.forEach((question, index) => {
        const questionElement = document.createElement("div");
        questionElement.className = "mb-5";

        questionElement.innerHTML = `
            <h3 class="font-semibold mb-2">${index + 1}. ${question.question}</h3>
            ${question.options.map(option => `
                <label class="block">
                    <input type="radio" name="question${index}" value="${option}">
                    ${option}
                </label>
            `).join("")}
        `;
        quizContainer.appendChild(questionElement);
    });

    document.getElementById("quiz-section").classList.remove("hidden");
}

// Take Quiz
function takeQuiz() {
    fetchQuizQuestions();
    document.getElementById("quiz-section").scrollIntoView({ behavior: 'smooth' });
}


// Submit Quiz
document.getElementById("submit-quiz").addEventListener("click", () => {
    const resultContainer = document.getElementById("quiz-result");
    score = 0;
    let resultHTML = '';

    quizQuestions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        const userAnswer = selectedOption ? selectedOption.value : "Not Attempted";

        if (userAnswer === question.answer) {
            score++;
            resultHTML += `<p>Question ${index + 1}: Correct! Your Answer: <strong>${userAnswer}</strong></p>`;
        } else {
            resultHTML += `<p>Question ${index + 1}: Wrong! Your Answer: <strong>${userAnswer}</strong> | Correct Answer: <strong>${question.answer}</strong></p>`;
        }
    });

    resultHTML += `<h3>You scored ${score} out of ${quizQuestions.length}!</h3>`;
    resultHTML += `<button id="new-quiz" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4" onclick="takeQuiz()">New Quiz</button>`;

    resultContainer.innerHTML = resultHTML;
});
let lastArticleTimestamp = null; // To track the latest news timestamp

// Poll for breaking news every 30 seconds
setInterval(() => {
    fetchBreakingNews();
}, 10000); // 10 seconds interval

// Fetch Breaking News
function fetchBreakingNews() {
    fetch(`${url}breaking-news&apiKey=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
            const articles = data.articles;
            const latestArticle = articles[0]; // Assuming the first article is the latest
            const latestArticleTime = new Date(latestArticle.publishedAt).getTime();

            // Check if the latest news is newer than the last shown news
            if (!lastArticleTimestamp || latestArticleTime > lastArticleTimestamp) {
                lastArticleTimestamp = latestArticleTime;
                showNotification(latestArticle);
            }
        })
        .catch((error) => {
            console.error("Error fetching breaking news:", error);
        });
}

// Show Notification
function showNotification(article) {
    const notification = document.createElement('div');
    notification.className = 'notification fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded shadow-lg';
    notification.style.zIndex = '9999'; // Ensure it appears on top

    notification.innerHTML = `
        <h4 class="font-semibold">Breaking News!</h4>
        <p>${article.title}</p>
        <a href="${article.url}" target="_blank" class="text-white underline">Read More</a>
    `;

    document.body.appendChild(notification);

    // Automatically remove notification after 10 seconds
    setTimeout(() => {
        notification.remove();
    }, 10000); 
}
const WEATHER_API_KEY = "0740609b2dd27d148cb088a123e02652"; 
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

async function fetchWeather(city) {
    try {
        const response = await fetch(`${weatherUrl}${city}&appid=${WEATHER_API_KEY}&units=metric`); // Use metric for Celsius
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            console.error("Error fetching weather:", data.message);
            document.getElementById("weather-info").innerHTML = "Weather not found";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayWeather(data) {
    const weatherIcon = document.getElementById("weather-icon");
    const weatherInfo = document.getElementById("weather-info");
    
    const iconCode = data.weather[0].icon;
    const temp = Math.round(data.main.temp);
    const city = data.name;

    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherInfo.innerHTML = `${temp}°C in ${city}`;
}

// Fetch default weather for a predefined city
window.addEventListener("load", () => {
    fetchWeather("Jakarta"); // You can change this to any default city you prefer
});
