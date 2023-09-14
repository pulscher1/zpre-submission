# Z-Prefix-Application

## Description
This is a web-based application to manage and track inventory items. A fictional company for Fens Fresh Foods was created tp provide focuse and a theam for the UI. Unfortuantly I ran out of time, but just imagin there is lots of green and subtle fresh foods in the backgroud of the application. Fens Fresh Food Inventory was built using Node.js, Knex, Express, React, and Material UI.

## Installation and Application Set Up

1. Clone the repository
2. Navigate to the project directory
3. Install dependecies
   3.1 Front end
     - npm i node
     - npm i react-router-dom
     - npm i @mui/material @mui/styled-engine-sc styled-components
     - npm i @emotion/react-
     - npm i @emotion/styled
   3.2 Back end
     - npm i express pg knex
     - npm i nodemon
     - npm i node
     - npm install cors
     - Npm I cors
     - npm install bcrypt
     - npm i express-session
    
4. Set up the server
   4.1 Open a new terminal to set up docker
     - Run these commands for docker
        - docker pull postgres
        - docker ps -a
        - docker exec -it containerID  bash
        - psql -U postgres
  4.2 Run these commands to set up a postgress
    - CREATE DATABASE zpre;
    - \list
    - \c database_name;
  4.3 In visual studio (or equivelent) run these commandes to create the tables
      - Run npx knex migrate:latest
      - ** if you seed the database you will need to create X initial accounts or items where X is the number of accounts/items in the seed
      - Run npm start
5. Initilize the front end
   - Navigate to where you want the file
   - Test by running npm start
  
  And that should get you up and running!!




     
