# 📚 Media Library

A full-stack media bookmarking application built with Vue.js, Express, and SQLite.

## Features

- Save web articles
- Save image links
- Save video links
- Edit bookmarks
- Delete bookmarks
- SQLite database
- REST API
- Docker support

## Technology Stack

### Frontend

- Vue 3
- Axios
- Vite

### Backend

- Node.js
- Express
- SQLite

## Project Structure

```
client/
server/
database/
```

## Installation

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## API

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /bookmarks | Get all bookmarks |
| POST | /bookmarks | Create bookmark |
| PUT | /bookmarks/:id | Update bookmark |
| DELETE | /bookmarks/:id | Delete bookmark |

## Roadmap

- [ ] Categories
- [ ] Search
- [ ] Favorites
- [ ] Image thumbnails
- [ ] Embedded YouTube videos
- [ ] Responsive design
- [ ] Authentication
- [ ] Cloud deployment

## Screenshot

![Media Library](docs/screenshots/home.png)

## Author

James
