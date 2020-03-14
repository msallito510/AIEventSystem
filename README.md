# AI Event System


## Description

AI Event System is an application to control access to events using artificial intelligence: face recognition.

## User Stories

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.

**Homepage** - As a user I want to be able to access the homepage so that I see what the app is about, with login and signup.

**Sign up** - As a user I want to sign up on the webpage using AI face recognition so that I can see all the events that I could attend.

**Login** - As a user, I want to be able to log in on the webpage so that I can get back to my account.

**Logout** - As a user, I want to be able to log out from the webpage so that I can make sure no one will access my account.

**Profile** - As a user, I want to be able to see my profile and edit it.

**Events list** - As a user, I want to see all events available listed by date so that I can choose which ones I want to got to.

**Events create** - As a user, I want to create an event so that I can invite others.

**Updating events** - As a user, I want to update an event created by me.

**Deleted events** - As a user, I want to delete an event created by me so that the event is no longer available in the event list.

**Events detail** - As a user, I want to see the event details and attendee list of one event so that I can decide if I want to go.

**Attend event** - As a user, I want to be able to attend the event so that the organizers can count me in.

## Backlog

***Events filter*** - As a user, I want to be able to filter a event by popularity, date, name.

***Event like*** - As a user, I want to be able to give a 'like' to an event in order to see it in my favorite events list.

***Favorite Events list*** - As a user, I want to be able to see all the events I have given a 'like'.

***AI login*** - As a user, I want to access the app through AI face recognition.

***AI Event access*** - As a user, I want to be able to attend (or not) an event though face reconition.

***Native app feel*** - As a user, I want to have a nice smartphone feeling event though it is not a native app.

User profile: - see my profile - upload my profile picture - list of events created by the user 

Homepage: - list today event - list events the user is attending - event filter visible 

Favorite: - list event user give a 'like'

Event Access: - 

## ROUTES:

| Name            | Method | Endpoint| Description| Body| Redirects       |
| --------------- | ------ | ----------------------------- | ------------------------------------------------ | ------------------------------------- | --------------- |
| Home            | GET    | /                             | See the main page                                |                                       |                 |
| Log in form     | GET    | /login                        | See the form to log in                           |                                       |                 |
| Log in          | POST   | /login                        | Log in the user                                  | {mail, password, selfie}                      | /               |
| Sign Up form    | GET    | /signup                       | See the form to sign up                          	|_				|
|Sign Up		|POST|		|Sign up a user|{mail, password, selfie}|/profile|
|Log out	|GET	|/logout	|Log out a user	|	|/	|
|Profile	|GET	|/Profile	|profile page editable form	|	|	|
|Profile edited	|POST	|/profile|Send user's data changed|{email, password, selfie}|/profile/edit	|

## Models

User model

    {
    	username: {
            type: String,
            required: true,
            unique: true
        }
    	password: {
            type: String,
            required: true,
            unique: true
        }
        selfie: String (url)
    }

Event model

    { 
    	owner: ObjectId<User>
    	name: String
    	description: String
    	date: Date
    	location: String
    	+
    
    }

## Links

### Trello

https://trello.com/aiec1/home

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/msallito510/AIEventSystem)

[Deploy Link](http://heroku.com/)

### Slides

[Slides Link](http://slides.com/)

## TODO list -
1- repo
2- express generator (master)
3- deploy en heroku


