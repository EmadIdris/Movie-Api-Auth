# Movie-Api-Auth
***
## Partner

+ Emad Idris
+ Samah Hamed
+ Amr Nzzal
+ Wesam Alqawasmeh
+ Omar Nabeel

# Overview
This App is a back end API. The back end allows a user to Sign up, sign in read, create, update and delete based on the users authorization level. The four levels are user, writer, editor, and admin .

# UML
![](./lab09UML.png)
![](./project.png)

## END POINT
```
http://localhost:3030/v2/movies
```
```
[
    {
        "id": 3,
        "name": "fight club",
        "year": 2000,
        "Category": "action",
        "rateing": 4,
        "createdAt": "2021-11-10T15:01:11.008Z",
        "updatedAt": "2021-11-10T15:01:11.008Z"
    },
    {
        "id": 4,
        "name": "Prisoners",
        "year": 2021,
        "Category": "action",
        "rateing": 10,
        "createdAt": "2021-11-10T15:01:51.959Z",
        "updatedAt": "2021-11-10T15:01:51.959Z"
    },
    {
        "id": 5,
        "name": "Flight",
        "year": 2016,
        "Category": "drama",
        "rateing": 15,
        "createdAt": "2021-11-10T15:03:02.914Z",
        "updatedAt": "2021-11-10T15:03:02.914Z"
    }
]
```

```
http://localhost:3030/signup
```
```
{
    "user": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtYWQiLCJpYXQiOjE2MzY1NjAzNDd9.vRJueQIJ8Ll3dTxXxD-QZ8mYKoi3stqHNtUw640U0Qs",
        "capabilities": [
            "read",
            "create",
            "update",
            "delete"
        ],
        "id": 1,
        "username": "emad",
        "password": "$2b$10$S5SxIP2LdsYbfHig504.e.gAyedRtUAA6EYro2CoBgI6NtsN7zkuO",
        "role": "admin",
        "updatedAt": "2021-11-10T16:05:47.405Z",
        "createdAt": "2021-11-10T16:05:47.405Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtYWQiLCJpYXQiOjE2MzY1NjAzNDd9.vRJueQIJ8Ll3dTxXxD-QZ8mYKoi3stqHNtUw640U0Qs"
}
```

***

# [Heroku]()

# [Pull-Request]()

***
> To Start ``` npm start```

> To Test ``` npm test```

***
## Setup

`.env` **requirements**

- `PORT` - Port Number

- `DATABASE_URL` = Postgres DB

- `SECRET` = JWT SECRET
