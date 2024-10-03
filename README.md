NewsPop is a responsive web application that aggregates and delivers the latest news headlines from various sources, allowing users to search, filter, and even take quizzes on current events. The app is designed with a dynamic user experience, providing a sleek interface and interactive features, including weather updates and real-time breaking news notifications.

>>Features:

• News Aggregation: Pulls news from various sources using the NewsAPI.    
• Real-Time Updates: Get breaking news updates with live notifications.    
• Search Functionality: Users can search for news articles by keyword or topics.    
• Date Filtering: Users can filter news articles by date range.    
• News Quiz: A fun trivia quiz based on current events to test user knowledge.    
• Dynamic Weather Updates: Displays real-time weather information for selected cities.    
• Mobile Responsive: Optimized for various screen sizes with a dynamic menu on smaller screens.    
• Interactive Design: Hover animations, color changes, and smooth transitions for a modern look.

![Screenshot1](https://github.com/user-attachments/assets/6ddbb399-2801-493c-8325-ea6fb18936fe)
![image](https://github.com/user-attachments/assets/cc3ef546-23f7-4cc6-b95b-1014d47df52f)
![image](https://github.com/user-attachments/assets/51951b0a-4c9b-443f-8f8e-e695d5618ec6)
![image](https://github.com/user-attachments/assets/f108f265-c229-4ab2-bb35-7bbb1e8cda36)

>>Installation:

git clone https://github.com/mansha-02/NewsApp.git    
cd NewsApp

Install dependencies 

>>Set up API keys:

1. Register for NewsAPI and get your API key.    
2. Register for OpenWeatherAPI and get your weather API key.    
3. Add the API keys to script.js:     
const API_KEY = 'your-newsapi-key';    
const WEATHER_API_KEY = 'your-openweatherapi-key';    
4. Run the project: Simply open index.html in your browser or use a local server setup to run the application.

>>Usage

• Upon loading, NewsPop will display the latest news from the default category (India) -- click on news cards for detailed news!
• Use the search bar at the top or the mobile search bar to filter news by keywords.    
• Filter articles using the date range filter to display news published within specific dates.    
• Interact with the Quiz section by clicking on "Quiz" in the navbar and answering random trivia questions.    
• The weather widget will automatically display weather information for a predefined city (default: Jakarta), but you can modify it to show weather updates for your city.    
• Watch for breaking news notifications that appear dynamically at the bottom right of the page every 10 seconds.

>>Technologies Used

Frontend:    
• HTML5    
• CSS3 (Tailwind CSS)    
• JavaScript (ES6+)    
• Font Awesome    
• Google Fonts (Poppins)    
APIs:    
NewsAPI for fetching news articles.    
OpenWeatherAPI for dynamic weather updates.    
OpenTDB API for fetching quiz questions.    
Development Tools:    
Visual Studio Code    
Git & GitHub for version control    
Browser DevTools for debugging    






>>This project is licensed under the MIT License

