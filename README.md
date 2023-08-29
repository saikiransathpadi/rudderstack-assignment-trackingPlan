# Project Name

Tracking Planner - Rudder Stack

## Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installing Dependencies](#installing-dependencies)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Frontend Components](#frontend-components)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Description

This overview the listing adding and validation of tracking Plans and assciating them with respective events

## Prerequisites

To understand the codebase a good understanding of NodeJs / Javascript is required.

## Getting Started

Make sure you have installed NodeJs in your system.

### Installing Dependencies

```
# Navigate to the server directory and install backend dependencies
cd server
npm install

# Navigate to the client directory and install frontend dependencies
cd ../client
npm install

```

## API Endpoints

1. **Create Tracking Plan**
   - Method: POST
   - Endpoint: `/api/tracking-plans`

2. **Create Event**
   - Method: POST
   - Endpoint: `/api/events`

3. **Associate Event with Tracking Plan**
   - Method: POST
   - Endpoint: `/api/associate-event`

4. **Get Tracking Plan by ID**
   - Method: GET
   - Endpoint: `/api/tracking-plans/:id`

5. **Get Event by ID**
   - Method: GET
   - Endpoint: `/api/events/:id`

6. **Update Tracking Plan**
   - Method: PUT
   - Endpoint: `/api/tracking-plans/:id`

7. **Update Event**
   - Method: PUT
   - Endpoint: `/api/events/:id`

## Frontend Components

1. **Tracking Plan List**
   - Description: Display a list of tracking plans and associated events.

2. **Tracking Plan Builder**
   - Description: User interface to create tracking plans and associate events.

## Technologies Used

List the technologies, frameworks, and libraries used in the project.

- Node.js
- Express
- MongoDB
- React
- Material-UI

