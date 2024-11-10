# JourneyGenie

JourneyGenie is a sophisticated AI-powered trip planning platform that streamlines the travel experience by offering personalized recommendations, seamless flight and hotel booking, and intuitive trip journaling. With the integration of external APIs and a user-friendly design, JourneyGenie is designed to cater to the needs of modern travelers, ensuring ease of use and accessibility. 

## Prerequisites

Before getting started, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## How to Run the Website Locally

Follow these steps to set up and run the JourneyGenie website on your local machine.

### 1. Clone the Repository

First, clone the repository from the main branch using the following command:

```bash
git clone https://github.com/NandishDPatel/JourneyGenie.git
```


### 2. Navigate to the Project Folder

Change into the `JourneyGenie` directory on your local machine:

```bash
cd JourneyGenie
```

### 3. Install Dependencies

Run the following command to install the necessary npm packages and dependencies:

```bash
npm install
```

### 4. Run the Node Proxy Server

Start the Node.js proxy server by running the following command:

```bash
node proxy-server.js
```

### 5. Start the Development Server

In a new terminal go inside the JourneyGenie project folder and then run the following command to launch the frontend development server:

```bash
npm run dev
```

The website should now be running locally and accessible at `http://localhost:5173`.

## Additional Information

- Make sure to configure any environment variables if required (e.g., using a `.env` file). Check for an `.env.example` file if present in the repository.
- If you encounter any errors or issues, check the terminal output for details.



