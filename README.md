# 🎵 AuraTunes — Emotion-Based Music Recommendation System

AuraTunes is an **AI/ML-based emotion-aware music recommendation system** that recommends music based on the user's detected facial emotion. The application provides an interactive interface where users can upload an image, detect their emotion, and receive suitable music recommendations.

## 🖥️ Frontend

This repository contains the **frontend implementation of AuraTunes**, developed using **React.js and JavaScript**.

The frontend is responsible for:
- Providing an interactive and responsive user interface
- User registration and login interfaces
- Image upload for emotion detection
- Communicating with the backend through REST APIs
- Displaying detected emotions
- Displaying recommended songs and playlists
- Music playback through embedded YouTube videos
- Playlist management
- Community posts and comments
- Feedback functionality

## ⚙️ Backend

The backend is implemented separately using **Python, Django, and Django REST Framework**.

The backend handles:
- REST API development
- User authentication using JWT
- Database operations using Django ORM
- Emotion detection using DeepFace and OpenCV
- Music recommendation logic
- YouTube Data API integration

The backend repository is **not included in this repository due to its size**.

## 🧠 Emotion Detection

AuraTunes uses the **DeepFace pre-trained model** for facial emotion analysis. The uploaded image is processed through the backend, where the model identifies the dominant emotion from the facial expression.

Supported emotions include:

- Happy
- Sad
- Angry
- Neutral
- Fear
- Surprise
- Disgust

The detected emotion is then used to generate a suitable music search query.

## 🎶 Music Recommendation

After detecting the user's emotion, the backend uses the **YouTube Data API** to search for relevant songs and playlists.

For example:

```text
Detected Emotion → Happy

Search Query → Happy Songs Playlist

        ↓

YouTube Data API

        ↓

Recommended Songs / Playlists
