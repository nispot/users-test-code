# My Driscoll's Coding Test

Welcome to My React App! This application is built with React and Tailwind CSS.

## Table of Contents

- [Instructions](#instructions)
- [Project Notes](#project-notes)
- [Libraries Used](#libraries-used)
- [Instructions of Coding Test](#coding-test)

## Instructions

1. **Clone the repository**:

```bash
git clone https://github.com/nispot/users-test-code.git
cd mi-repo
```

2. **Install dependencies:**:
   npm install

3. **Run the project**

- Development: npm run dev
- Production Build: npm run build
- Linter: npm run lint
- Formatter: npm run format

# 1. Project Notes

I created this project with the goal of making the coding test as close as possible to a real-world, scalable application. User photos are randomly fetched from https://randomuser.me/photos. To speed up development, the backend for the user CRUD API was created using https://app.beeceptor.com/.

# Libraries Used

## React + TypeScript + Vite

https://vitejs.dev/guide

## Navigation - SPA

- React Router
  https://reactrouter.com/

## State Management

- Redux Toolkit
  https://redux-toolkit.js.org/

## Translations

- i18next
  https://www.i18next.com/

## CSS

- Tailwind
  https://tailwindcss.com/

## Forms

- formik (control de formularios)
- https://formik.org/docs/guides/validation

- Yup (validaciones sugeridas por formik)
  https://github.com/jquense/yup

## Notifications (Toasts)

- Sonner
  https://sonner.emilkowal.ski/

## Icons

-Hero Icons
https://heroicons.com/

## Animated Skeletons for Users Management

- react-content-loader
  https://github.com/danilowoz/create-content-loader

### Linter and Formatter

- Eslint & Prettier (airBnb)

## Coding Test

Here is the information for the coding test:

Create a SPA in react and Typescript where I can have the following modules

Users Module

1. View of the users in the app

2. View/Edit single user

3. If pasted a specific URL we land in the specific view of the user uniquely identified

4. Delete a user

5. Create a new user

News Module

1. List of news

2. View of single news

- Include also multi language ( all the text related to actions in the app should be translated in two languages: en, es)

- Once the code is completed please provide the instructions to run the project

- Provide an npm repo that we can download from
