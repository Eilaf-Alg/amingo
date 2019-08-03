## Getting Started

1. Clone the repo `git clone git@github.com:eilaf-alg/amingo.git && cd amingo`
2. Install dependencies `npm install`
3. Run server `npm start`

## Project Structure

```
│
├── config (configuration goes here)
│   ├── keys.js 
│   ├── keys_dev.js (secret and db connection for development env)
│   ├── keys_prod.js (secret and db connection for development prod)
│   └── passport.js (passport configuration)
│
├── models (database models goes here)
│   ├── Post.js 
│   └── User.js
│
├── routes (routes goes here)
│   ├── Auth.js (Login/Register endpoints) 
│   ├── Post.js (/posts/ routes)
│   └── User.js (/users/ routes)
│
├── .gitingore
├── package.json
└── server.js (entry point of application)
```

## Tools Used

- node.js (JavaScript runtime)
- MongoDb (Database)
- VS Code (IDE)
- Heroku (Cloud hosting)
- Postman (For testing endpoints)
- Git (For code repository)

## Dependencies
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - for password hashing
- [body-parser](https://www.npmjs.com/package/body-parser) - for Parsing incoming request
- [express](https://expressjs.com/)- Fast, unopinionated, minimalist web framework for Node.js
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - for JWT(json web token)
- [mongoose](https://mongoosejs.com/) - for model application data.
- [nodemon](https://www.npmjs.com/package/nodemon) - for automatically restarting application
- [passport](http://www.passportjs.org/) - for authentication
- [passport-jwt](https://www.npmjs.com/package/passport-jwt) - for authenticating with a JSON Web Token.

## Stories
- As a visitor on amingo.com, I should be able to register myself.
- As a register user on amingo.com, I should be log in to the website.
- As a logged in user on amingo.com, I should be able to follow other users.
- As a logged in user on amingo.com, I should be able to share posts with my followers.
- As a logged in user on amingo.com, I should be able to able to follow registered users.
- As a logged in user on amingo.com, I should be able to able to follow posts made by users.

------------------

## Endpoints

### 1. Register

##### HTTP Request
`POST http://localhost:5000/auth/register`

##### Request Parameters
Parameter | Mandatory | Description
--------- | ------- | -----------
email 	  | yes | email address of customer (e.g hello@minhaj.io)
password | yes | password of customer (e.g dontTellAnyone)
name | yes | name of customer
gender | yes | gender of cutomer
	
#### Sample Response 
```json
{
    "followers": [],
    "_id": "5d2f557c31f98904cfaf6fa7",
    "name": "Test Name",
    "email": "hello@mail.com",
    "password": "$2a$10$W0FWetsCQO/qHF0h/ljzxupXAmqaKwSTNmCZ3/3mh5awSfBqxk.hu",
    "gender": "M",
    "date": "2019-07-17T17:06:04.017Z",
    "__v": 0
}
```

### 2. Login

##### HTTP Request
`POST http://localhost:5000/auth/login`

##### Request Parameters
Parameter | Mandatory | Description
--------- | ------- | -----------
email 	  | yes | email address of customer (e.g hello@minhaj.io)
password | yes | password of customer

#### Sample Response 
```json
{
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMmYzNWM3NTBhYjQzN2YxNjgyNTdjMSIsIm5hbWUiOiJNaW5oYWogTWVobW9vZCIsImVtYWlsIjoiaGVsbG9AbWluaGFqLmlvIiwiaWF0IjoxNTYzMzgyNTczfQ.v8xVvrigxbBEXdkUGd7Z0Cf5JRd8WT3ITSBl8zqE5P0",
    "name": "Minhaj Mehmood"
}
```