**Heart Disease Predictor (FastAPI + Random Forest)**

- **Project:** A REST API backend (FastAPI) serving a serialized Random Forest model and a small static frontend (HTML/CSS/JS) that collects patient features, posts them to the API, and visualizes the prediction and confidence.

**Features**
- **Prediction API**: POST `/predict` accepts patient features and returns a label and confidence score.
- **Model**: Random Forest classifier (trained on the Kaggle Heart Disease dataset), serialized with `joblib` as `random_forest_model` and `scaler.joblib` for input scaling.
- **Validation**: Request schema validated with Pydantic model in `app.py`.
- **Simple Frontend**: `index.html`, `styles.css`, and `script.js` — collects all required inputs, POSTs JSON to the backend, and displays an animated confidence gauge and badge.
- **Dockerfile**: Containerize the FastAPI app (Dockerfile present in repo).

**Tech Stack**
- **Language:** Python 3.x
- **Backend:** FastAPI + Uvicorn
- **ML:** scikit-learn (RandomForest), joblib, pandas, numpy
- **Frontend:** HTML, CSS, vanilla JavaScript
- **Dev/Ops:** Docker (Dockerfile included)

**Skills Demonstrated**
- Building a lightweight ML-backed REST API with FastAPI
- Model serialization/deserialization with `joblib`
- Input validation with Pydantic
- Basic data preprocessing (scaling) at inference
- Vanilla frontend integration with fetch API
- Simple UI/UX with CSS animations and responsive layout
- Containerization with Docker

**Repository: Key Files**
- `app.py` — FastAPI application. Loads the model, defines the Pydantic `heart` schema, and exposes the `/predict` endpoint.
- `random_forest_model` — serialized model file (joblib). (binary)
- `scaler.joblib` — serialized StandardScaler used at inference.
- `index.html` — frontend page with form and result visualization.
- `styles.css` — frontend styling.
- `script.js` — frontend logic that sends POST requests and animates the result.
- `Dockerfile` — containerization file for the backend.
- `requirements.txt` — Python dependencies used by the project.

**API**
- GET `/` — basic health/home message
- POST `/predict` — JSON body with the following fields (all required):
  - `age` (int)
  - `sex` (int)
  - `cp` (int)
  - `trestbps` (int)
  - `chol` (int)
  - `fbs` (int)
  - `restecg` (int)
  - `thalach` (int)
  - `exang` (int)
  - `oldpeak` (float)
  - `slope` (int)
  - `ca` (int)
  - `thal` (int)

  Example request (curl):
  ```bash
  curl -X POST "http://localhost:8000/predict" \
    -H "Content-Type: application/json" \
    -d '{"age":63,"sex":1,"cp":3,"trestbps":145,"chol":233,"fbs":1,"restecg":0,"thalach":150,"exang":0,"oldpeak":2.3,"slope":0,"ca":0,"thal":1}'
  ```

  Example response (JSON):
  ```json
  {
    "label": "Heart Disease Present",
    "confidence": 61.5432
  }
  ```

**Frontend**
- `index.html` contains a form whose field names match the Pydantic model keys. The frontend (`script.js`) sends a POST JSON payload to the configured `PREDICT_URL` and expects the response shown above.
- If your backend endpoint requires `/predict` make sure `PREDICT_URL` in `script.js` is set to `https://heart-disease-fastapi-backend.onrender.com/predict` (or your local URL).

**Run Locally (recommended)**
1. Create a Python virtual environment and activate it.
   ```powershell
   python -m venv .venv; .\.venv\Scripts\Activate.ps1
   ```
2. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
3. Run the API server (development):
   ```powershell
   uvicorn app:app --reload --host 0.0.0.0 --port 8000
   ```
4. Serve the frontend (optional, or open `index.html` directly). To serve via a static file server:
   ```powershell
   cd 'C:\Users\Himanshu\Desktop\Heart-Disease_New'; python -m http.server 8000
   # then open http://localhost:8000/index.html
   ```

**CORS Note**
If you serve the frontend from a different origin than the API you will likely see CORS errors in the browser. Enable CORS in `app.py` by adding the following snippet near the app creation block:

```python
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# rest of app
```

**Docker (build & run)**
- Build image (PowerShell):
  ```powershell
  docker build -t heart-disease-app .
  ```
- Run container:
  ```powershell
  docker run -p 8000:8000 heart-disease-app
  ```
## Developed By- Himanshu Raturi [![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/himanshu-raturi/)