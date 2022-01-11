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


## 💻 API DOCUMENTATION 

#### Endpoints
- API_ROOT - https://micro-blogging-platform-server.herokuapp.com 
- Authorization required - Requests require the JWT token. Set Authorization : Bearer <token> in header.
- Query params - Just add the params in the url 
- Form body - Send as body in fetch request 

### 1)USER  

#### 1. Login 

- POST
- End point - API_ROOT/api/v1/users/login 
- Authorization Required - No
- Form body
  - email - String
  - password - String

- Returns a JWT to be used for further authentication

- Returns JSON 

```
{
"success": true,
"message": "Sign in successfull , here is your token . Keep it safe !",

"data": {
        "token": "<token>"
      }
}
```


#### 2. SignUp 

- POST
- End point - API_ROOT/api/v1/users/signup 
- Authorization Required - No
- Form body 
  - email - String
  - password - String
  - confirmPassword - String
  - name_ - String
  - user_name - String

#### 3. Profile

- GET
- End point - API_ROOT/api/v1/users/profile/:id
- Authorization Required - Yes
- Params - Add user.id as param to get the user profile data



- Returns JSON 

```
{
    "message": "User profile fetched successfully!",
    "data": {
        "profile_user": {
            "_id": "61dc26d6843e7ea2438aa267",
            "email": "smdyarkhan00000@gmail.com",
            "user_name": "sameer",
            "name_": "sameer"
        },
        "user_tweets": [
            {
                "_id": "61dc272b843e7ea2438aa26b",
                "content": "Hi I am sameer !",
                "user": "61dc26d6843e7ea2438aa267",
                "createdAt": "2022-01-10T12:31:39.302Z",
                "updatedAt": "2022-01-10T12:31:39.302Z",
                "__v": 0
            }
        ],
        "followers": [
            {
                "from_user": {
                    "_id": "61db0c55119bd2efa6eda67e",
                    "email": "smdyarkhan0000@gmail.com",
                    "user_name": "sam2",
                    "name_": "samad"
                }
            }
        ],
        "following": []
    },
    "success": true
}
```

#### 4. Following User

- POST
- End point - API_ROOT/api/v1/users/follow/:id
- Authorization Required - Yes
- Params - Add user.id as param to get the user profile data
- Returns JSON 

```
{
    "message": "You started following this user!",
    "success": true,
    "newFollowRelationShip": {
        "from_user": "61dc26d6843e7ea2438aa267",
        "to_user": "61db0c55119bd2efa6eda67e",
        "_id": "61dc4f6acedf8581b0f7810d",
        "createdAt": "2022-01-10T15:23:23.010Z",
        "updatedAt": "2022-01-10T15:23:23.010Z",
        "__v": 0
    }
}
```

#### 5. Unollowing User

- POST
- End point - API_ROOT/api/v1/users/unfollow/:id
- Authorization Required - Yes
- Params - Add user.id as param to get the user profile data
- Returns JSON 




### 2)TWEETS

Tweets are like micro blogs and we have the functionality to create, delete and fetch our tweets and the tweets of the people whom we follow.

#### 1. Create a new Tweet 

- POST
- End point - API_ROOT/api/v1/tweets/create 
- Authorization Required - Yes
- Form body
  - content - String (less than 140 chars)

- Returns the following upon success

```
{
    "data": {
        "tweet": {
            "content": "Feeling a little sick !",
            "user": {
                "_id": "61dc26d6843e7ea2438aa267",
                "email": "smdyarkhan00000@gmail.com",
                "user_name": "sameer",
                "name_": "sameer"
            },
            "_id": "61dc5265cedf8581b0f78115",
            "createdAt": "2022-01-10T15:36:05.373Z",
            "updatedAt": "2022-01-10T15:36:05.373Z",
            "__v": 0
        }
    },
    "message": "Tweets created!",
    "success": true
}
```
#### 2. Delete Your Tweet 

- DELETE
- End point - API_ROOT/api/v1/tweets/delete/:id
- Authorization Required - Yes

```
{
    "message": "Tweet deleted successfully",
    "success": true
}
```

#### 3.  Get your own tweets (sorted by latest)

- GET
- End point - API_ROOT/api/v1/tweets/self
- Authorization Required - Yes
- JSON Response

```
{
    "message": "Tweet fetched successfully",
    "success": true,
    "myTweets": [
        {
            "_id": "61dc5265cedf8581b0f78115",
            "content": "Feeling a little sick !",
            "user": "61dc26d6843e7ea2438aa267",
            "createdAt": "2022-01-10T15:36:05.373Z",
            "updatedAt": "2022-01-10T15:36:05.373Z",
            "__v": 0
        },
        {
            "_id": "61dc272b843e7ea2438aa26b",
            "content": "Hi I am sameer !",
            "user": "61dc26d6843e7ea2438aa267",
            "createdAt": "2022-01-10T12:31:39.302Z",
            "updatedAt": "2022-01-10T12:31:39.302Z",
            "__v": 0
        }
    ]
}
```

#### 4.  Get tweets by the people you follow (sorted by latest)

- GET
- End point - API_ROOT/api/v1/tweets/timeline
- Authorization Required - Yes

- JSON Reponse 


```
{
    "message": "Tweet fetched successfully",
    "success": true,
    "tweets": [
        {
            "_id": "61dc5265cedf8581b0f78115",
            "content": "Feeling a little sick !",
            "user": {
                "_id": "61dc26d6843e7ea2438aa267",
                "user_name": "sameer",
                "name_": "sameer"
            },
            "createdAt": "2022-01-10T15:36:05.373Z",
            "updatedAt": "2022-01-10T15:36:05.373Z",
            "__v": 0
        },
        {
            "_id": "61dc2777843e7ea2438aa274",
            "content": "Too cloud  today !",
            "user": {
                "_id": "61dabcff577930f23b4c7292",
                "user_name": "sam",
                "name_": "samad"
            },
            "createdAt": "2022-01-10T12:32:55.210Z",
            "updatedAt": "2022-01-10T12:32:55.210Z",
            "__v": 0
        }
    ]
}

```








  

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
3. MongoDB
4. Node.js
5. Express.js

## Feel free to test the project and don't forget to star the repo if it proves helpful !
