# Answers to Technical Questions

---

### 1. How long did you spend on the coding test?
I spent approximately *18-20 hours* on the coding test. This time included:

- Planning and understanding the requirements
- Implementing core features such as adding, editing, deleting, and filtering tasks
- Styling the user interface for a clean, intuitive experience
- Testing to ensure all functionalities worked as expected in different scenarios

---

### 2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

One of the most useful features in recent JavaScript updates is *optional chaining (?.)*. This feature simplifies accessing deeply nested properties in an object without having to check each level manually. It reduces code verbosity and handles cases where some properties might be undefined.

I used optional chaining in my JavaScript code to safely access properties within the task object without risking runtime errors.

#### Code Snippet
```javascript
// Accessing nested property safely using optional chaining
const taskPriority = task?.priority ?? 'Low'; // Defaults to 'Low' if priority is undefined
In this example, task?.priority ensures that if task is undefined or null, it won’t throw an error. Instead, the code will assign 'Low' as the default priority if task.priority is not defined.
```

---

### 3. How would you track down a performance issue in production? Have you ever had to do this?

To track down a performance issue in production, I would follow this approach:

- *Identify the Issue*: Monitor the application for any slow or unresponsive sections using browser developer tools or performance tools like Lighthouse in Chrome.
- *Profiling*: Use performance profiling to analyze specific areas of the JavaScript code that are consuming excessive resources. This includes examining event listeners, DOM updates, and functions with high execution time.
- *Console and Logs*: Implement logging around critical sections to capture potential bottlenecks. These logs can be sent to an external service (like Loggly or Datadog) for easier tracking and monitoring.
- *Analyze Network Requests*: Check for any network delays, such as long loading times for resources. Optimizing network requests, reducing image sizes, and using caching can significantly improve performance.
- *Optimize Code*: Based on profiling results, I would refactor or debounce certain functions, remove unnecessary re-renders, or optimize the logic where necessary.

While I haven’t had to handle performance issues in a live production environment, I used some of these techniques during development to ensure smooth performance, especially as more tasks were added to the dashboard.

---

### 4. If you had more time, what additional features or improvements would you consider adding to the task management application?

If I had more time, I would consider adding the following features to enhance functionality and improve the user experience:

- *User Authentication*: Enable user accounts so tasks can be saved and retrieved on any device.
- *Notifications*: Add reminders or notifications for upcoming or overdue tasks to help users stay on track.
- *Due Date Sorting*: Implement automatic sorting within each category based on due dates, making prioritization easier.
- *Collaborative Task Management*: Allow users to share tasks with others and assign specific tasks within a team or group.
- *Analytics Dashboard*: Provide insights into task completion trends, most common priorities, and productivity metrics.
- *Dark Mode*: Offer a dark mode option to allow users to customize the interface to their preference.
- *Mobile Optimization*: Further refine the design and interactions for mobile devices to improve the experience on smaller screens.

These additional features would make the application more comprehensive and enhance the overall user experience.

---