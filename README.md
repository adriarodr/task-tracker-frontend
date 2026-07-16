# Frontend for Task Tracker Application

<!-- short project description -->

This is the frontend for my [Task Tracker API](https://github.com/adriarodr/task-tracker-api) built using React. The frontend allows users to register, log in, and manage their tasks through the browser.

## Main Features

<!-- Features included -->

This application features:

- A registration form for users to create an account
- A login form for users to sign in and manage tasks
- Users can view, add, edit, and delete their tasks
- Error and loading messages
- Handles the JWT token from login to allow access to protected views through conditional rendering

## Technologies Used

<!-- Development Specific Technologies -->

### Development

- **[Visual Studio Code](https://code.visualstudio.com/)**
- **[ESLint](https://eslint.org/)** and **[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)** to lint and format the code to prevent errors
- **[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)** to use ESLint and Prettier together without conflicts

<!-- Other Technologies Used -->

### Dependencies

- **[Vite](https://vite.dev/)** with **[React Framework](https://react.dev/)** to build the frontend

## Instructions for Local Setup

### Prerequisites

- A code editor such as **[Visual Studio Code](https://code.visualstudio.com/)**
- **[Node.js (LTS Version recommended)](https://nodejs.org/en)** version 24.15.0 or above installed
- **[Git](https://git-scm.com/)** to clone and manage the repository
- **[Task Tracker API](https://github.com/adriarodr/task-tracker-api)** for the backend

### How to run the backend locally

Please review the [Task Tracker API](https://github.com/adriarodr/task-tracker-api) page for the prerequisites and detailed instructions for local Setup for the backend.

#### Steps

##### 1. Clone the Task Tracker API repository

Open your terminal and run the following commands to clone the project:

```bash
git clone https://github.com/adriarodr/task-tracker-api.git
cd task-tracker-api
```

##### 2. Install the Dependencies

Install all the required packages in the `package.json` using the following command:

```bash
npm install
```

##### 3. Create a `.env` file

Rename the `.env.example` file from the Task Tracker API repository to `.env` and fill in your values.

##### 4. Start the server

Start the local server with:

```bash
npm start
```

or, if you want Node.js to automatically restart on file changes, use:

```bash
npx nodemon
```

To confirm that the API is running, visit `http://localhost:PORT/api/health` where PORT is the port number you set in `.env` or the default value 3000.

### How to run the frontend locally

#### Steps

##### 1. Clone the repository

Open your terminal and, next to the folder for the Task Tracker API, run the following commands to clone the project:

```bash
git clone https://github.com/adriarodr/task-tracker-frontend.git
cd task-tracker-frontend
```

##### 2. Install the Dependencies

Install all the required packages in the `package.json` using the following command:

```bash
npm install
```

##### 3. Create a `.env` file

Either duplicate the `.env.example` file and rename it to `.env`, or create a new `.env` file and add the required variables mentioned in the [List of Required Environment Variables](#list-of-required-environment-variables).

##### 4. Start the server

In another terminal from the one running the Task Tracker API, start the local server with the following command:

```bash
npm run dev
```

## List of Required Environment Variables

The frontend requires the following environment variables:

```ini
VITE_API_URL=your_api_url
VITE_TOKEN_KEY=your_name_for_the_key
```

- `VITE_API_URL` is the URL that the Task Tracker API is running on
- `VITE_TOKEN_KEY` is the key value name for storing the JWT token in local storage (This is not the actual JWT token)

These variables are included in `.env.example`, so you can copy that file, rename it to `.env`, and add your own values.

## Image Citations

All images used in this project are CC0-licensed, openly licensed, or my original work. The list below organizes them by category, with each including the photo's file name and either a note that it's original work or a link to the source page.

### Icons

| Icon        | File Name       | License | Credit                                                             |
| ----------- | --------------- | ------- | ------------------------------------------------------------------ |
| Plus Circle | plus-circle.svg | CC0     | [Link to the icon](https://www.svgrepo.com/svg/471792/plus-circle) |
| Trash Can   | trash.svg       | CC0     | [Link to the icon](https://www.svgrepo.com/svg/472001/trash-03)    |
| x Circle    | x-circle.svg    | CC0     | [Link to the icon](https://www.svgrepo.com/svg/472092/x-circle)    |
| Log In      | log-out.svg     | CC0     | [Link to the icon](https://www.svgrepo.com/svg/471636/log-in-03)   |
| Pencil      | pencil.svg      | CC0     | [Link to the icon](https://www.svgrepo.com/svg/471750/pencil-02)   |

## Known Issues or Future Improvements

### Known Issues

No known issues at this time.

### Future Improvements

- Add a confirmation for when deleting tasks
