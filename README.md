# Dashboard Application

This project demonstrates a comprehensive dashboard application built with React. It includes features for weather and news updates, a Kanban task board, and data analytics with charts. The application integrates multiple libraries and public APIs to provide a smooth user experience.

## Features

### 1. Weather and News Dashboard (Route: `/dashboard/weather-news`)

- **Weather Section**:
  - **API Integration**: Uses the OpenWeather API to display the current location, temperature, and conditions.
  - **City Search**: Allows users to search for weather by city name.
  - **Dynamic Data**: Fetches details like sunrise and sunset times from the API.
  - **Loading State**: Displays a loading spinner (using `Loader2` from Lucide React) while data is being fetched.

- **News Section**:
  - **API Integration**: Fetches news articles using the News API.
  - **Pagination**: Supports pagination to load more articles.
  - **Error Handling**: Shows a message if the API call fails.

### 2. Interactive Kanban Board (Route: `/dashboard/kanban`)

- **Drag-and-Drop**: Built with Hello Pangea’s DnD library for intuitive task management.
- **Columns**: Comes with default columns such as “To Do,” “In Progress,” and “Completed.”
- **Task Management**: Users can create, edit, drag, and move tasks between columns.
- **Modal Dialogs**: Radix UI Dialogs are used for adding tasks with a title, description, and due date.
- **LocalStorage Persistence**: Saves the board's state in `localStorage` to retain data across page reloads.
- **Responsive Design**: Adapts well to various screen sizes, including mobile.

### 3. Analytics Dashboard (Route: `/dashboard/analytics`)

- **Charts Section**:
  - **Library Used**: Utilizes Chart.js with React for data visualization.
  - **Line Chart**: Displays user activity trends over the last 7 days.
  - **Bar Chart**: Shows monthly sales performance.

- **Dynamic Table**:
  - **Data Population**: Uses a mock API to populate user data.
  - **Features**: Includes pagination, search, and filtering options.
  - **Table Structure**: Built with a custom Table component, separating header, body, and footer for clarity.
  - **Loading State**: Shows a loading indicator while data is being fetched.

## Summary

This project is complete and includes detailed README documentation and relevant screenshots of the UI. A README file and example screenshots of the dashboard pages are also included to help showcase the functionality and design of the application.

---


