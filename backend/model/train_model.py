import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import os

# Load dataset
df = pd.read_csv('../../heart.csv')

# Manual One-Hot Encoding as per requirements
# Baseline categories (dropped): 
# Sex_F, ChestPainType_ASY, RestingECG_LVH, ExerciseAngina_N, ST_Slope_Down

df['Sex_M'] = (df['Sex'] == 'M').astype(int)
df['ChestPainType_ATA'] = (df['ChestPainType'] == 'ATA').astype(int)
df['ChestPainType_NAP'] = (df['ChestPainType'] == 'NAP').astype(int)
df['ChestPainType_TA'] = (df['ChestPainType'] == 'TA').astype(int)
df['RestingECG_Normal'] = (df['RestingECG'] == 'Normal').astype(int)
df['RestingECG_ST'] = (df['RestingECG'] == 'ST').astype(int)
df['ExerciseAngina_Y'] = (df['ExerciseAngina'] == 'Y').astype(int)
df['ST_Slope_Flat'] = (df['ST_Slope'] == 'Flat').astype(int)
df['ST_Slope_Up'] = (df['ST_Slope'] == 'Up').astype(int)

# Target
y = df['HeartDisease']

# Features in specified order
feature_cols = [
    'Age', 'RestingBP', 'Cholesterol', 'FastingBS', 'MaxHR', 'Oldpeak', 
    'Sex_M', 'ChestPainType_ATA', 'ChestPainType_NAP', 'ChestPainType_TA', 
    'RestingECG_Normal', 'RestingECG_ST', 
    'ExerciseAngina_Y', 'ST_Slope_Flat', 'ST_Slope_Up'
]
X = df[feature_cols]

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scaling
# User specified Numerical Features: Age, RestingBP, Cholesterol, FastingBS, MaxHR, Oldpeak
scaler = StandardScaler()
X_train_scaled = X_train.copy()
numeric_cols = ['Age', 'RestingBP', 'Cholesterol', 'FastingBS', 'MaxHR', 'Oldpeak']
X_train_scaled[numeric_cols] = scaler.fit_transform(X_train[numeric_cols])

# Train Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Evaluation
X_test_scaled = X_test.copy()
X_test_scaled[numeric_cols] = scaler.transform(X_test[numeric_cols])
y_pred = model.predict(X_test_scaled)
print(f"Model Accuracy: {accuracy_score(y_test, y_pred) * 100:.2f}%")

# Save model and scaler
joblib.dump(model, 'model.pkl')
joblib.dump(scaler, 'scaler.pkl')
print("Model and Scaler saved successfully.")
