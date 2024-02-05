<div align="center">
  <a href="https://tridiamond.tech" target="_blank" rel="noopener noreferrer">
    <img width="450" alt="image" src="https://www.freelytomorrow.com/images/tmp/posts.png">
  </a>
  <br/>
  <h1> <b> Auto Sell </b></h1>
  <strong>C2C's automotive trading platform</strong>
</div>

<br/>

<p align="center">
  <img alt="NPM Version" src="https://img.shields.io/badge/npm-10.1.0-red">
  <img alt="NODE Version" src="https://img.shields.io/badge/NodeJS-20.9.0-red">
  <img alt="MongoDB Version" src="https://img.shields.io/badge/MongoDB-7.0.0-green">
</p>


<div align="center">

  **[Demo](http://tridiamond.tech)** |
  **[Showcase Video](https://youtube.com)**
</div>

Auto sell is a second-hand car trading platform that integrates AI price prediction and generates objective prices based on various technical indicators of the models sold by users. Car buyers and sellers can choose to meet offline to inspect their cars, reducing fraud and quality issues.

🚀 How to **RUN**
```
npm start
```

<br/>

## Screenshots
![Home Page](https://www.freelytomorrow.com/images/tmp/index.png)

![Posts](https://www.freelytomorrow.com/images/tmp/posts.png)

![Valuation](https://www.freelytomorrow.com/images/tmp/valuation.png)

![User Login](https://www.freelytomorrow.com/images/tmp/login.png)

![User Register](https://www.freelytomorrow.com/images/tmp/register.png)



<hr>



## 🏳️‍🌈 Routes

### ⭐️ Users related routes
- /users/login: User login page.
- /users/register: New user registration page.
- /users/profile: The page to show users profile and the posts they have already posted.
- /users/logout: User logout - destroy session.

### ⭐️ Posts related routes
- /posts : The page to show all posts
- /getallposts: The interface to return posts data to the front-end.
- /posts/new: The interface to receive post data sent from .front-end, data will be wrote in the database.
- /posts/:id (GET) : Return all data of a specific post to the front-end.
- /posts/:id (DELETE): Delete the specific post based on the post id.
- /posts/:id (PATCH): Allow users to update the posts they have posted.

### ⭐️ Valuation related routes
- /valuation: Vehicle valuation method: The form data sent by the front-end will be routed here, and then a Python subprocess will be generated to execute the Python valuation script. Finally, the price will be returned to the front-end step by step

### ⭐️ Editor routes
- /editor: Reusable editor page for creating new posts and updating post operations

<hr>

## 🏳️‍🌈 Middleware

### ⭐️ authentication.js
- login : Used to verify if the user is in a logged in state
- register: Used to verify whether the email and phone number entered by the user during registration match in the database

### ⭐️ postverification
When users update or delete posts, perform permission verification by comparing the uuid in the session with the uuid in the post data. If they are the same, the operation can be performed

## 🏳️‍🌈 db
Code for connect and CRUD the Mongo database

## 🏳️‍🌈 Valuation resources
- Valuation script: /public/python/app/prediction.py
- Model: /public/python/app/models

<hr>

### 🛠 Configuration
- General configuration: **/config/config.js**
``` js
    dbHost: 'localhost',
    dbPort: '27017',
    dbName: 'SIT725Project',
    timezone: 'Australia/Melbourne',
    secret: 'sit725demo' //secret used to encrypted user session
```
- Session configuration: **app.js**
``` js
app.use(session({
  name: 'sid',  //cookie name
  secret: `${secret}`,  //secret key
  saveUninitialized: false,  //Is a cookie set for each request to store the session ID
  resave: true, //Each request to resave session - refresh session lifetime
  store: mongoStore.create({mongoUrl: `mongodb://${dbHost}:${dbPort}/${dbName}`}),
  cookie: {httpOnly: true, maxAge: 1000 * 60 * 60} //session expired in 1 hour
}));
```



## 🚀 What is yet to come?

undefined

## 🏆 Project Contributors

<p>
  <a href="https://github.com/chuny1wang" alt="CHUNYI WANG"><img src="https://avatars.githubusercontent.com/u/60209113?v=4" height="50" width="50"></a>
  <a href="https://github.com/sandhusimranjitsingh" alt="Sandhu Simranjit Singh"><img src="https://avatars.githubusercontent.com/u/79216736?v=4" height="50" width="50"></a>
  <a href="https://github.com/lpliu8899" alt="=LYONS LIU"><img src="https://avatars.githubusercontent.com/u/141409542?v=4" height="50" width="50"></a>
  <a href="https://github.com/aidandeb" alt="=AIDAN MICHAEL DEBERNARDI"><img src="https://avatars.githubusercontent.com/u/132536077?v=4" height="50" width="50"></a>
  <a href="https://github.com/HaixinLiao" alt="=HAIXIN LIAO"><img src="https://avatars.githubusercontent.com/u/151189361?v=4" height="50" width="50"></a>
  

</p>

## 🥇 Repository activities

![Alt](https://repobeats.axiom.co/api/embed/e66a08208dbd898eea4b888e89b670c12b2d9f2a.svg "Repobeats analytics image")
