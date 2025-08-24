### **README.md**

# Simple User Manager

This is a simple web application for managing user data. It allows you to add, edit, and delete user information. The application is built using Node.js and the EJS templating engine.

## Features

  - [cite\_start]**View Users**: See a list of all users, including their ID, email, and username[cite: 7, 8, 9, 10].
  - [cite\_start]**Add New Users**: A form is provided to create new user accounts with an email, username, and password[cite: 1, 2].
  - [cite\_start]**Edit Users**: Update an existing user's username or password[cite: 6].
  - [cite\_start]**Delete Users**: A form is available to delete a user by entering their password[cite: 5].

## Technologies Used

  - **Node.js**: The runtime environment for the application.
  - **Express.js**: A web framework for handling routes and requests.
  - [cite\_start]**EJS (Embedded JavaScript Templating)**: Used to generate the HTML pages dynamically[cite: 1, 3, 5, 6, 7].
  - **CSS**: A separate `style.css` file is used to style the application's pages.

## Getting Started

### Prerequisites

  - Node.js installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Harisankarmohanty/simple-user-manager.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd simple-user-manager
    ```
3.  Install the required npm packages:
    ```bash
    npm install express ejs method-override
    ```
    *(Note: `method-override` is suggested for handling PATCH and DELETE requests from HTML forms.)*

## Usage

1.  Start the server:

    ```bash
    node index.js
    ```

    *(Assuming your main server file is named `index.js`.)*

2.  Open your web browser and navigate to `http://localhost:3000` to see the list of users.

## Project Structure

  - `views/`: Contains the EJS template files.
      - [cite\_start]`home.ejs`: Displays the total number of users[cite: 3, 4].
      - [cite\_start]`user.ejs`: Lists all users in a table and includes buttons to add, edit, or delete[cite: 7, 8, 9, 10, 11, 12, 13].
      - [cite\_start]`new.ejs`: The form to add a new user[cite: 1, 2].
      - [cite\_start]`edit.ejs`: The form to edit an existing user's details[cite: 6].
      - [cite\_start]`delete.ejs`: The form to confirm the deletion of a user[cite: 5].
  - `public/css/`: (You would create this directory) Contains the `style.css` file.
  - `index.js`: (Main server file) Handles all the routes and logic.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
