# Recipe Book
A Website for sharing Recipies among Users.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
Before running the server on your local machine, following *npm packages* must be installed in the same directory where you have cloned the project.

*requirements*
* [nodejs](https://nodejs.org)
* npm
* [mysql](https://www.mysql.com)
* [mongodb](https://www.mongodb.com)

You can install them manually or run the following command
```
  npm install
```
*Database*
* mysql - For storing Users, Recipes, etc tables.
* mongodb - For storing Sessions.

## Database Usage
For mongodb, excute the following commands in root directory of RecipeBook Folder
```
  cd Site/database/sessions
  mongod --dbpath=./ --port=5000
```
*Note: The port above can be whatever you assign*

For mysql, To create a database
```
  create database "recipeBook";
  create user "recipeBookAdmin" identified by "123456";
  use gamerparadise;
  GRANT ALL PRIVILEGES ON recipeBook.* to "recipeBookAdmin";
  FLUSH PRIVILEGES;
  
```
*Note: These are default credentials hardcoded inside RecipeBook/Site/database/database.js and can be changed. All the above commands must be executed as root user of mysql*

## Running The Server On Your Machine
```
  cd ./Site
  node server.js
```
*Note: The default port, the website runs on is 4000 and can be changed in server.js"

## Screenshots
### Landing Page
<img src="https://github.com/Bhaikko/RecipeBook/blob/master/Screenshots/landingpage.png"
     style="float: left; margin-right: 10px;"/>
     
### User Homepage
<img src="https://github.com/Bhaikko/RecipeBook/blob/master/Screenshots/homepage.png"
     style="float: left; margin-right: 10px;"/>
     
### Profile Page
<img src="https://github.com/Bhaikko/RecipeBook/blob/master/Screenshots/profilePage.png"
     style="float: left; margin-right: 10px;"/>
     
## Libraries
The site uses following libraries built by other people.

* [turn.js](http://www.turnjs.com)
