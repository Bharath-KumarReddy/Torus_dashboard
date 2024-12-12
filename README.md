# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```


## Features Implemented

1. **User Management Dashboard**  
   - **Login Page**: Allows user authentication using a mock API.
   - **Dashboard**: Displays a table of users with actions (view details, delete).
   - **Search and Filter**: Filter users by name or email.
   - **Pagination**: Displays users with pagination (5 users per page).
   
2. **Analytics Dashboard**  
   - **Charts Section**: 
     - User Registration Trend: A line chart showing user registrations over the past 6 months.
     - Active vs Inactive Users: A pie chart comparing active and inactive users.
     - Users by Region: A bar chart or map displaying user distribution by regions.
   
3. **Filters for Analytics**  
   - Allows filtering analytics by date range and region.
   
4. **Responsive Design**  
   - The dashboard is fully responsive and mobile-friendly.
   
---

## API

This project uses the following API to fetch user data:

- **API URL**: [https://retoolapi.dev/ryFIGz/data](https://retoolapi.dev/ryFIGz/data)

---

## Login Credentials
  - username: emilys
  - password: emiyspass

---

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js**: You can download it from [here](https://nodejs.org/).

---

## Getting Started

Follow these steps to get the project up and running:

1. **Clone the repository**:

2. **Install the dependencies**:
   - cd root_directory
   - npm install

3. **Start the project**:
   - npm run dev


