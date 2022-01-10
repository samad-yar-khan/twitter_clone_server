<h1 align="center">
    Micro-Blogging Platform
</h1>

<blockquote align="center">
  <b><i>
        This is the backend server for a micro-blogging platform like Twitter made with Node.js , Express.js and MongoDB.
  </i></b>
</blockquote>

<br/>

## Installation

1. To run the Web Application on your local system download Node.js - https://nodejs.org/en/download/ . This will give you access to the node package manager which is essential to run the project .

2.  1. The project uses MongoDB Atlas as the database service. Setup a MongoDB Atlas account. 
    2. Setup a new project and deploy a cluster. Connect the project to the MongoDB cluster by adding the URL provided by Atlas in the database configs. 
    3. Dont forget to set the password for the cluster in your environment variables, which is fetched through the environment folder.

3. Setup a JWT secret in your environment.


### 📌 Setting up project using `npm` :

1. Open this cloned folder in the text editor of your choice.
2. If you want to use the project using `npm` then that comes alongside when you download and install node js.

### 🚩 Running the project  :

1. Open the terminal and type in `npm install`, to install all the dependencies.
2. Run: `npm start`
3. Use [http://localhost:8000](http://localhost:8000) as the root for all API's.


## API DOCUMENTATION 

### 1)USER  

1. Login 



### 2)TWEETS
The Auto fill component is a stateless contolled component which takes props from its parent , which report its channges to the parents and fetch results accordingly.



## 💻 Working/WorkFlow

### 1)Input
The AutoFill component has an event handler which calls the handleChange function whenever a change is done to the input.


### 2)handleChange 
The handle change function will make an api call for the incomplete word of the input and fetch suggestions from the server.


### 3)Caching (Optimisation using Trie)
In an effort to minimise redundant API Calls we have used a Trie for which stores the suggestions for different prefexes. The Trie is stored in our Cache(local storage of user) and is reset every 30 seconds. The system is checked for pre-existing Trie in Cache whenever the component is rendered.  

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.Please make sure to update tests as appropriate.
### 📌 Prerequisites

### 💻 1. System requirement :

1. Any system with basic configuration.
2. Operating System : Any (Windows / Linux / Mac).

### 💿 2. Software requirement :

1. Updated browser
2. Node.js installed (If not download it [here](https://nodejs.org/en/download/)).
3. Any text editor of your choice.

### ⚡ 3. Skill set :

1. Knowledge of git & github.
2. JavaScript
3. [ReactJS](https://reactjs.org/)

## Feel free to test the hosted  version of the component and dont forget to star the repo if it proves helpful !

