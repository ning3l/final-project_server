# pl@net (backend)

[ᐅ see live](https://plaenet.netlify.app)<br/>
LOGIN<br/>
FicusFriend (Benjamini)<br/>
i_love_plants (daisy)

[ᐅ pl@net frontend](https://github.com/ning3l/instance-soup_fe)

Backend for my final project @WBS Coding School. 
pl@net is a houseplant maintenance app & social network for plant parents, helping users out with grooming tips & care notifications as well as encouraging
networking via attending events around the topic of indoor gardening. Current features include:

- Signup/Login
- Upload a custom profile picture
- Browse a catalog of 147 plants and visit detail pages for each to learn about their unique requirements
- Add/delete plants to a personal wishlist for future reference
- Add/delete plants to your personal plant repository and set/edit their health status as well as water/fertilize/repot intervals
- Get notified on your profile page whenever a plant needs your attention
- Search/create/attend/leave events
- See event details, including a map and which other users are attending
- Browse for other users
- Visit other user profiles and see which plants they own and which events they attend
- A messenger feature using socket.io

## Technologies

- ES6
- Node
- Express
- MongoDB
- JWT
- Socket.io
- Jira & Github for project management

## Features

| Endpoint                      | Route                         |
| ----------------------------- | :---------------------------- |
| GET (user context)            | /auth/me                      |
| POST (login user)             | /auth/login                   |
| GET (all plants)              | /plants                       |
| GET (single plant by id)      | /plants/:id                   |
| POST (add plant to user repo) | /plants/:id                   |
| PUT (edit plant in user repo)  | /plants/:id                  |
| DEL (delete plant from user repo)| /plants/:id                |
| GET (all users)               | /users                        |
| GET (specific user)           | /users/:id                    |
| GET (all events)              | /events                       |
| GET (single event by id)      | /events/:id                   |
| POST (create new event)       | /events/create                |
| POST (attend event)           | /events/attend                |
| POST (leave event)            | /events/leave                 |
| PUT (update event)            | /events/edit                  |
| DELETE (single event)         | /events/del                   |
| GET (all messages for curr user)| /messages                   |
| POST (add new message)        | /messages/:id                 |               
