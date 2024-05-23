# OneStep: Task/Habit/Goal Tracking App - Frontend

## Project Structure

The frontend part of this project is built with React Native. Below is an overview of the directory structure and the purpose of each folder.

### Directory Descriptions

- **src/**: Contains all source code and assets for the frontend application.
  - **assets/**: Contains static assets like images and styles.
    - **images/**: Stores image files used in the app.
    - **styles/**: Contains global stylesheets.
  - **components/**: Houses React components.
    - **common/**: Reusable components that can be used across multiple screens.
    - **screens/**: Components specific to individual screens.
      - **Auth/**: Components related to authentication (e.g., login, registration).
      - **Tasks/**: Components related to task management (e.g., task list, task details).
      - **Habits/**: Components related to habit management.
      - **Goals/**: Components related to goal management
  - **navigation/**: React Navigation configuration and navigators.
  - **services/**: Contains main screens.
  - **services/**: API service files to interact with Firebase and other external services.
  - **utils/**: Utility functions and helpers.
  - **index.js**: Main entry point that registers the root component.
