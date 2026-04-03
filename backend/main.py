from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Heart Disease Prediction API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and scaler
# We use try/except since we are building this incrementally
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "model.pkl")
SCALER_PATH = os.path.join(os.path.dirname(__file__), "model", "scaler.pkl")

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
except Exception as e:
    print(f"Error loading model/scaler: {e}")
    model = None
    scaler = None

class PatientData(BaseModel):
    Age: int
    Sex: str  # 'M' or 'F'
    ChestPainType: str  # 'ATA', 'NAP', 'TA', 'ASY'
    RestingBP: float
    Cholesterol: float
    FastingBS: int  # 0 or 1
    RestingECG: str  # 'Normal', 'ST', 'LVH'
    MaxHR: int
    ExerciseAngina: str  # 'Y' or 'N'
    Oldpeak: float
    ST_Slope: str  # 'Up', 'Flat', 'Down'

@app.get("/")
def read_root():
    return {"message": "Heart Disease Prediction API is running."}

@app.post("/predict")
def predict(data: PatientData):
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="Model or Scaler not loaded.")

    try:
        # 1. Processing Categorical Features
        Sex_M = 1 if data.Sex == 'M' else 0
        ChestPainType_ATA = 1 if data.ChestPainType == 'ATA' else 0
        ChestPainType_NAP = 1 if data.ChestPainType == 'NAP' else 0
        ChestPainType_TA = 1 if data.ChestPainType == 'TA' else 0
        RestingECG_Normal = 1 if data.RestingECG == 'Normal' else 0
        RestingECG_ST = 1 if data.RestingECG == 'ST' else 0
        ExerciseAngina_Y = 1 if data.ExerciseAngina == 'Y' else 0
        ST_Slope_Flat = 1 if data.ST_Slope == 'Flat' else 0
        ST_Slope_Up = 1 if data.ST_Slope == 'Up' else 0

        # 2. Build feature vector in EXACT order
        # [Age, RestingBP, Cholesterol, FastingBS, MaxHR, Oldpeak,
        #  Sex_M, ChestPainType_ATA, ChestPainType_NAP, ChestPainType_TA,
        #  RestingECG_Normal, RestingECG_ST,
        #  ExerciseAngina_Y, ST_Slope_Flat, ST_Slope_Up]
        
        feature_dict = {
            'Age': data.Age,
            'RestingBP': data.RestingBP,
            'Cholesterol': data.Cholesterol,
            'FastingBS': data.FastingBS,
            'MaxHR': data.MaxHR,
            'Oldpeak': data.Oldpeak,
            'Sex_M': Sex_M,
            'ChestPainType_ATA': ChestPainType_ATA,
            'ChestPainType_NAP': ChestPainType_NAP,
            'ChestPainType_TA': ChestPainType_TA,
            'RestingECG_Normal': RestingECG_Normal,
            'RestingECG_ST': RestingECG_ST,
            'ExerciseAngina_Y': ExerciseAngina_Y,
            'ST_Slope_Flat': ST_Slope_Flat,
            'ST_Slope_Up': ST_Slope_Up
        }
        
        input_df = pd.DataFrame([feature_dict])
        
        # 3. Scaling Numeric Features
        numeric_cols = ['Age', 'RestingBP', 'Cholesterol', 'FastingBS', 'MaxHR', 'Oldpeak']
        input_df[numeric_cols] = scaler.transform(input_df[numeric_cols])
        
        # 4. Predict
        prediction = model.predict(input_df)[0]
        probability = model.predict_proba(input_df)[0][1]
        
        return {
            "prediction": int(prediction),
            "probability": float(probability),
            "risk": "High" if prediction == 1 else "Low"
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
