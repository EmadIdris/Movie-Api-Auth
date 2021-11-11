# Movie-Api-Auth
***
## Collaborator developers🔻

+ Emad Idris
+ Samah Hamed
+ Amr Nzzal
+ Wesam Alqawasmeh
+ Omar Nabeel

## Overview🔻
<!-- This App is a back end API. The back end allows a user to Sign up, sign in read, create, update and delete based on the users authorization level. The four levels are user, writer, editor, and admin . -->
Movie-Api-Auth is a simple server. Which allows the client to send requests for account creation, update, delete, and to choose the role that will give the user the accessability to our data, we used `RBAC` mechanism to define the user roles. Also the client can request for movies list containes a different types of movies, update list, add to the list, delete from the list it depends on the user role.

## UML🔻
![](./lab09UML.png)
![](./project.png)

## Sample of requests🔻
```
get ==> http://localhost:3030/v2/movies
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
post ==> http://localhost:3030/signup
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
## Related links🔻

### [Heroku](https://project-401-auth.herokuapp.com/)

### [Pull-Request](https://github.com/EmadIdris/Movie-Api-Auth/pull/3)


***
## Setup to get this server working ❗ 

1. Fork this repo and clone the forked one on your machine.

2. `npm install ` to install all of the dependencies 

3. `.env` **requirements**

- `PORT` - Port Number

- `DATABASE_URL` = Postgres DB

- `SECRET` = JWT SECRET


***
> To Start =>  ``` npm start```

> To Test =>  ``` npm test```