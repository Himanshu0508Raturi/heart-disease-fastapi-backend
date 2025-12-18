# 🫀 Heart Disease Prediction API

A machine learning-powered REST API built with FastAPI that predicts the presence of heart disease based on clinical parameters.  The API uses a Random Forest classifier trained on heart disease data and provides predictions with confidence scores.

## 🌟 Features

- **Machine Learning Prediction**: Uses a Random Forest model for accurate heart disease detection
- **RESTful API**: Built with FastAPI for high performance and automatic API documentation
- **CORS Support**: Configured to allow cross-origin requests from specified domains
- **Confidence Scores**: Returns prediction confidence percentages
- **Standardized Input**: Implements StandardScaler for consistent data preprocessing
- **Docker Support**:  Includes Dockerfile for easy containerization and deployment

## 🚀 Live Demo

- **API Endpoint**: [Backend API]([https://himanshu0508raturi.github.io](https://heart-disease-fastapi-backend.onrender.com/docs))
- **Interactive Docs**: Access `/docs` endpoint for Swagger UI documentation
- **ReDoc**: Access `/redoc` endpoint for alternative API documentation

## 📋 API Endpoints

### Root Endpoint
```http
GET /
```
Returns a simple message confirming the backend is live.

### Prediction Endpoint
```http
POST /predict
```

**Request Body:**
```json
{
  "age": 63,
  "sex": 1,
  "cp": 3,
  "trestbps": 145,
  "chol": 233,
  "fbs": 1,
  "restecg": 0,
  "thalach":  150,
  "exang": 0,
  "oldpeak":  2.3,
  "slope":  0,
  "ca": 0,
  "thal": 1
}
```

**Response:**
```json
{
  "label": "Heart Disease Present",
  "confidence":  85.6732
}
```

## 📊 Input Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `age` | int | Age in years |
| `sex` | int | Sex (1 = male, 0 = female) |
| `cp` | int | Chest pain type (0-3) |
| `trestbps` | int | Resting blood pressure (mm Hg) |
| `chol` | int | Serum cholesterol (mg/dl) |
| `fbs` | int | Fasting blood sugar > 120 mg/dl (1 = true, 0 = false) |
| `restecg` | int | Resting electrocardiographic results (0-2) |
| `thalach` | int | Maximum heart rate achieved |
| `exang` | int | Exercise induced angina (1 = yes, 0 = no) |
| `oldpeak` | float | ST depression induced by exercise relative to rest |
| `slope` | int | Slope of the peak exercise ST segment (0-2) |
| `ca` | int | Number of major vessels colored by fluoroscopy (0-3) |
| `thal` | int | Thalassemia (0-3) |

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8+
- pip package manager

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/Himanshu0508Raturi/heart-disease-fastapi-backend.git
cd heart-disease-fastapi-backend
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Run the application**
```bash
uvicorn app:app --reload
```

The API will be available at `http://localhost:8000`

### Docker Deployment

1. **Build the Docker image**
```bash
docker build -t heart-disease-api .
```

2. **Run the container**
```bash
docker run -p 8000:8000 heart-disease-api
```

## 📦 Project Structure

```
heart-disease-fastapi-backend/
├── app.py                              # Main FastAPI application
├── random_forest_model                 # Trained ML model (pickled)
├── scaler.joblib                       # StandardScaler for preprocessing
├── heart_disease_prediction_system.ipynb # Jupyter notebook for model training
├── requirements.txt                    # Python dependencies
├── Dockerfile                          # Docker configuration
├── . dockerignore                       # Docker ignore file
├── index.html                          # Frontend interface
├── styles.css                          # Frontend styles
├── script.js                           # Frontend JavaScript
└── README.md                           # Project documentation
```

## 🧪 Technologies Used

- **[FastAPI](https://fastapi.tiangolo.com/)**: Modern, fast web framework for building APIs
- **[scikit-learn](https://scikit-learn.org/)**: Machine learning library (Random Forest classifier)
- **[Pandas](https://pandas.pydata.org/)**: Data manipulation and analysis
- **[NumPy](https://numpy.org/)**: Numerical computing
- **[Pydantic](https://pydantic-docs.helpmanual.io/)**: Data validation using Python type annotations
- **[Joblib](https://joblib.readthedocs.io/)**: Model serialization
- **[Uvicorn](https://www.uvicorn.org/)**: ASGI server for FastAPI

## 🤖 Model Information

The prediction model is a **Random Forest Classifier** trained on heart disease clinical data. The model:
- Uses 13 clinical features as input
- Applies StandardScaler for feature normalization
- Returns binary classification (Disease Present/Not Present)
- Provides confidence scores based on prediction probabilities

## 🔒 CORS Configuration

The API is configured to accept requests from:
- `https://himanshu0508raturi. github.io` (production)
- `http://localhost:3000` (development)

To add more origins, modify the `origins` list in `app.py`.

## 📝 API Documentation

Once the server is running, you can access: 
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🧑‍💻 Development

### Running Tests
```bash
# Add your test commands here
pytest
```

### Code Formatting
```bash
# Format code with black
black app.py
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  Feel free to check the [issues page](https://github.com/Himanshu0508Raturi/heart-disease-fastapi-backend/issues).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Himanshu Raturi**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/himanshu-raturi/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/Himanshu0508Raturi)

## ⭐ Show your support

Give a ⭐️ if this project helped you!

## 📌 Disclaimer

This application is for educational and informational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.

---

Made with ❤️ by [Himanshu Raturi](https://github.com/Himanshu0508Raturi)
