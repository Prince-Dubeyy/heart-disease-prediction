# ❤️ Heart Disease Prediction System

A **full-stack machine learning web application** that predicts the likelihood of heart disease using clinical data and AI models.

---

## 🌍 Live Application

👉 **Use the app here:**
🔗 https://heart-disease-prediction-jade.vercel.app/

---

## 🧠 Project Overview

This project uses machine learning algorithms to analyze patient health parameters and predict whether a person is at risk of heart disease.

It combines:

* 🧠 Machine Learning Model (trained on medical dataset)
* ⚙️ Backend API (FastAPI)
* 🎨 Frontend UI (React + Tailwind)
* 🔗 Full integration (Frontend ↔ Backend)

---

## ⚡ Features

* 🔍 Real-time heart disease prediction
* 🎨 Modern, responsive UI
* 📊 Probability-based confidence score
* 🌗 Dark/Light mode support
* ⚡ Smooth animations & UX
* 🔗 Live deployed system

---

## 🧾 Input Features

The model uses the following medical attributes:

* Age
* Sex
* Chest Pain Type
* Resting Blood Pressure
* Cholesterol
* Fasting Blood Sugar
* Resting ECG
* Max Heart Rate
* Exercise-Induced Angina
* Oldpeak
* ST Slope

---

## 🏗️ Tech Stack

### 🔹 Machine Learning

* Python
* Scikit-learn
* Pandas, NumPy

### 🔹 Backend

* FastAPI
* Uvicorn
* Joblib

### 🔹 Frontend

* React.js
* Tailwind CSS
* Framer Motion

---

## 📁 Project Structure

```
heart-disease-prediction/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── model/
│       ├── model.pkl
│       └── scaler.pkl
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── tailwind.config.js
│
├── heart.csv
├── run_app.py
└── Heart Disease Models.ipynb
```

---

## 🚀 How to Run Locally

### 🔹 1. Clone Repository

```
git clone https://github.com/Prince-Dubeyy/heart-disease-prediction.git
cd heart-disease-prediction
```

---

### 🔹 2. Backend Setup (FastAPI)

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

👉 Backend runs on:

```
http://127.0.0.1:8000
```

👉 API Docs:

```
http://127.0.0.1:8000/docs
```

---

### 🔹 3. Frontend Setup (React)

```
cd frontend
npm install
npm run dev
```

👉 Frontend runs on:

```
http://localhost:5173
```

---

## 🔗 API Endpoint

### POST `/predict`

#### Example Input:

```json
{
  "Age": 40,
  "Sex": "M",
  "ChestPainType": "ATA",
  "RestingBP": 140,
  "Cholesterol": 289,
  "FastingBS": 0,
  "RestingECG": "Normal",
  "MaxHR": 172,
  "ExerciseAngina": "N",
  "Oldpeak": 0.0,
  "ST_Slope": "Up"
}
```

#### Output:

```json
{
  "prediction": 0,
  "probability": 0.23
}
```

---

## 🌐 Deployment

* 🎨 Frontend deployed on **Vercel**
* ⚙️ Backend deployed on **Render**

---

## ⚠️ Note on Free Hosting

* Backend may take **30–60 seconds** to respond after inactivity (Render free tier)
* After waking up, responses are fast ⚡

---

## 📊 Model Performance

| Model               | Accuracy | F1 Score |
| ------------------- | -------- | -------- |
| Logistic Regression | ~84.7%   | ~86%     |
| KNN                 | ~84.2%   | ~85%     |
| SVM                 | ~84.2%   | ~86%     |
| Naive Bayes         | ~83%     | ~84%     |

---

## ✨ UI Highlights

* Glassmorphism design
* Smooth animations
* Risk visualization
* Clean medical dashboard UI

---

## 📌 Future Improvements

* Explainable AI (feature importance)
* Advanced models (XGBoost, Ensemble)
* User authentication
* Performance optimization

---

## ⚠️ Disclaimer

This project is for **educational purposes only** and should not be used as a substitute for professional medical advice.

---

## 👨‍💻 Author

**Prince Dubey**
🔗 https://github.com/Prince-Dubeyy

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
