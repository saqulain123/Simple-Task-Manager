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