# Freenance
This is a web application developed based on the Next.js framework. It provides a service for recording daily financial transactions. The application uses the following dependencies:

1. **next**: [Next.js](https://nextjs.org/) is a framework for developing universal React applications with support for server rendering.
2. **axios**: [Axios](https://axios-http.com/docs/intro) is a library for making HTTP requests to the server. Used to communicate with the API server and receive data.
3. **react-hook-form**: [React Hook Form](https://react-hook-form.com/) is a library for managing forms in React. Used to create and validate forms in the application.
4. **@reduxjs/toolkit**: [Redux](https://redux-toolkit.js.org/) is library for managing application state. Provides convenient tools for creating a Redux store, reducers and actions.
5. **sass**: [Sass(Scss)](https://sass-lang.com/) is CSS preprocessor. Used for more convenient and flexible writing of styles in the application.
6. **react-chartjs**: [Chart.js](https://react-chartjs-2.js.org/) is a library for creating interactive charts and graphs. Used to visualize analytical data in the application.
7. **eslint**: [Eslint](https://eslint.org/) is a tool for static analysis of JavaScript/TypeScript code. Used to detect and fix potential problems and style errors in the code.
8. **prettier**: [Prettier](https://prettier.io/) is a tool for automatic code formatting. Used to maintain a consistent coding style across a project.

## Application Architecture

The application is divided into components and pages. Components are responsible for individual parts of the interface, such as headers, buttons, graphics, etc. Pages use components to create specific application screens, such as Analytics, Dashboard, and Settings. The Redux store is used to store and manage application state, including data related to analytics and settings. Forms in the application are managed using react-hook-form, which provides convenient management and validation of user input.

Such a Next.js application with specified dependencies provides powerful tools for developing an analytical interface, and also provides flexibility, security and efficiency of development using TypeScript, eslint and prettier.

## Getting Started

To run the application in the development environment, you need to run the following commands in the terminal

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy

This application is forked and available at this link:

[https://freenance.store](https://freenance.store/)
