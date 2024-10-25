# Frontend Documentation

## Introduction
This frontend interacts with the backend API [Acadex Task Backend](https://github.com/JorgeSarricolea/acadex_task_backend) to manage categories, tasks (homeworks), and users, using Clean Architecture principles.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <frontend-repository-url>
   cd <frontend-repository-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

> [!TIP]
> Ensure that you use the same Node.js version as the backend to avoid compatibility issues.

3. **Run the frontend application:**
   ```bash
   npm start
   ```

> [!IMPORTANT]
> Ensure the backend server is running to enable proper interaction.

## Features

### Services
Located in `src/app/application/services`, these services manage API requests to interact with resources:

- **AuthService**: Manages user authentication, including login and registration.
- **CategoryService**: Retrieves data related to categories.
- **HomeworkService**: Handles task operations such as creation, updating, and deletion.
- **StorageService**: Stores and retrieves data from local storage.
- **UserService**: Fetches and updates user information.

### Use Cases
Located in `src/app/application/use-cases`, each module provides specific use cases:

- **auth**: Manages user login and registration (`LoginUser.js`, `SignupUser.js`).
- **category**: Retrieves all categories and category details (`GetAllCategories.js`, `GetCategoryById.js`).
- **homework**: CRUD operations for tasks (`CreateHomework.js`, `DeleteHomework.js`, `GetAllHomeworks.js`, `GetHomeworkById.js`, `UpdateHomework.js`).
- **user**: Gets user details and allows updates (`GetUserById.js`, `UpdateUser.js`).

### Components
Located in `src/app/components`, these components are modular and reusable:

- **Modals**: Various modals for adding, editing, and deleting tasks (`AddTaskModal`, `EditTaskModal`, `DeleteTaskModal`, `EditUserModal`).
- **TaskBoard**: Primary component for the task board interface.
- **FormInputs**: Reusable form input components.
- **AddTaskButton**: Button to activate the task creation modal.
- **DraggableTaskCard**: Task card with drag-and-drop functionality.
- **Header** and **Tag**: Additional components for structure and styling.

### Hooks
Located in `src/app/hooks`, these custom hooks increase reusability and functionality:

- **useAuth**: Manages authentication state.
- **useForm**: Custom hook for form handling.
- **useResponsiveBackground**: Manages background based on screen size.

### API Configuration
In `src/app/infrastructure/config`, the `configAPI.js` file contains the configuration to connect with the API, with the URL defined directly in the code.

### Pages
Located in `src/app/pages`, these are the primary application pages:

- **Home** (`home/page.jsx`): Main page displaying tasks and categories.
- **Login** (`login/page.jsx`): Login form.
- **Signup** (`Signup/page.jsx`): User registration page.
- **Layout** (`layout.jsx`): Provides a common layout across pages.

### Assets
Located in `src/app/public/assets`, this folder contains images, icons, and backgrounds.