from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from sklearn.preprocessing import StandardScaler
import pandas as pd
from fastapi.responses import JSONResponse

model = joblib.load('random_forest_model')
app = FastAPI()
scaler = joblib.load('scaler.joblib')

class heart(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

feature_names = ['age','sex','cp','trestbps','chol','fbs','restecg','thalach','exang','oldpeak','slope','ca','thal']
@app.get("/")
async def root():
    return {"message": "This is homepage.Backend is live."}

@app.post("/predict")
async def prediction(input: heart):
    try:
        input_data = [input.age,input.sex,input.cp,input.trestbps,input.chol,input.fbs,input.restecg,input.thalach,input.exang,input.oldpeak,input.slope,input.ca,input.thal]
        # Convert inputs to a DataFrame to match feature names
        input_df = pd.DataFrame([input_data],columns=feature_names)
        # Apply StandardScaler to the input data
        input_scaled = scaler.transform(input_df)
        # Make prediction and get probability scores
        prediction = model.predict(input_scaled)
        prediction_prob = model.predict_proba(input_scaled)

        # Get confidence percentage
        confidence = np.max(prediction_prob) * 100

        if prediction[0] == 1:
            return JSONResponse({
                "label": "Heart Disease Present",
                "confidence": round(confidence, 4)
            })
        else:
            return JSONResponse({
                "label": "No Heart Disease Present",
                "confidence": round(confidence, 4)
            })
    except Exception as e:
        return JSONResponse(
            {
                "error": str(e)
            },status_code=500
        )