# Virtual Event Management System

## Overview

The **Virtual Event Management System** is a backend platform designed to manage virtual events efficiently. It allows authenticated users to register, log in, create events, manage event details, and handle participant registrations. The system prioritizes security by using **bcrypt** for password hashing and **JWT** for session management.

This system offers a set of **RESTful API endpoints** to manage users and events, with features such as:

- User registration and login.
- Event CRUD operations (Create, Read, Update, Delete).
- Event participation management.
- Email notifications on successful event registrations.

## Features

1. **User Authentication and Authorization**

   - Secure user registration and login using **bcrypt** for hashing passwords and **JWT** for token-based authentication.
   - Role distinction: Event organizers and attendees.

2. **Event Management**

   - Create, update, and delete events (accessible only to authenticated and authorized users).
   - Event data includes: name, date, time, description, and a participant list.

3. **Participant Management**

   - Allow users to register for events.
   - Manage participant lists efficiently.

4. **Database Integration**
   - Initially developed using in-memory data structures, later extended to integrate with **MongoDB** for persistence.

## Requirements

### 1. Project Setup

- Use **Node.js** and **Express.js** for backend development.
- Integrate necessary packages for RESTful API development, user authentication, and email notifications.

### 2. User Authentication

- Use **bcrypt** to hash passwords securely.
- Implement token-based session management using **JWT**.

### 3. Event Management

- Design a schema for events that includes fields for:
  - `eventName`
  - `date`
  - `time`
  - `description`
  - `participantList`
  - `createdBy`
- Allow CRUD operations, restricted to the event's creator.

### 4. RESTful API Endpoints

- Offer endpoints for user authentication and event management.
- Handle proper status codes and error responses for all endpoints.

### 5. Asynchronous Operations

- Use `async/await` and Promises to handle tasks like database interactions and email notifications.

### 6. Email Notifications

- Send confirmation emails to users upon successful registration for an event.

## API Endpoints

### User Endpoints

| HTTP Method | Endpoint                 | Description                                                                      |
| ----------- | ------------------------ | -------------------------------------------------------------------------------- |
| POST        | `/api/v1/users/register` | Register a new user. `userName` and `email` must be unique. Responds with a JWT. |
| POST        | `/api/v1/users/login`    | Log in an existing user. Responds with a JWT.                                    |

### Event Endpoints

| HTTP Method | Endpoint                      | Description                                          |
| ----------- | ----------------------------- | ---------------------------------------------------- |
| GET         | `/api/v1/events`              | Retrieve a list of all events.                       |
| GET         | `/api/v1/events/:eventId`     | Retrieve details of a specific event by ID.          |
| POST        | `/api/v1/events`              | Create a new event (authorized users only).          |
| PUT         | `/api/v1/events/:eventId`     | Update an event by ID (only the creator can update). |
| DELETE      | `/api/v1/events/:eventId`     | Delete an event by ID (only the creator can delete). |
| POST        | `/api/v1/events/:id/register` | Register for an event as a participant.              |

## Project Plan

1. **Design API Endpoints**: Define request and response structures for each endpoint.
2. **Implement CRUD Operations**: Start with in-memory data structures, then integrate **MongoDB** for persistence.
3. **Develop Authentication and Authorization**: Secure APIs with JWT and enforce role-based access.
4. **Asynchronous Enhancements**: Add email notifications and ensure smooth async operations.
