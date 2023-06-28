## Jaeung Kim - IS21 - FULL STACK COMPEITITION - REQ101408

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)

## Introduction

The BC Government Ministry of Citizens' Services Information Management Branch (IMB) is currently trying to catalog current modern web applications in GitHub, as well as new products that are coming up in the future. Currently, there are 40 products marked for modernization that need to be cataloged, as well as 3 products that are either actively being developed or in a maintenance lifecycle.

This application provides a simple way to display, create and edit information related to these web applications. The user base for this application will include a wide array of technical skills, therefore making this application as simple as possible to use is being stressed by the IMB Senior Leadership Team (SLT).

## Technologies Used

The following technologies were used in building this web application:

- Backend: Node.js, Express.js, Faker.js, Docker
- Frontend: React, Tailwind CSS, Headless UI
- Database: MongoDB
- Documentation: Swagger

## Installation and Setup

To run this application on your local development machine, follow these steps:

1. Open Terminal and Clone the repository on the directoy of your choice.

```bash
git clone https://github.com/jaeungkim/Jaeung-Kim-ecc-dssb-IS21-code-challenge-req101408.git
```

2. Install Node.js if it is not already installed on your machine. Node.js is required to run this application.

3. Install MongoDB if it is not already installed on your machine. You can refer to https://www.mongodb.com/docs/manual/installation/

4. Install Docker if it is not already installed on your machine. 

## Usage

To run the application, please follow the steps below:

1. Open a terminal and navigate to the project directory.

```bash
cd Jaeung-Kim-ecc-dssb-IS21-code-challenge-req101408
```

### Project

1. Open Terminal and install dependencies. This will install both frontend and backend dependencies

```bash
npm run init
```

2. Run the application. This will run `docker compose up -d`.
`
```bash
npm run up
```

Now, you should be able to see the front end application at http://localhost:3030/
And, you can also see the back end swagger documentation at http://localhost:3000/api/api-docs

### Docker

While docker is initializing at backend process,

Faker.js will automatically populate your mongodb database with 40 products.

It will display the following upon successful docker compose.

It might take couple minutes to fully propagate.

```bash
[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
Listening on port 3000
Successfully connected to MongoDB
Added new products
```

