from fastapi import FastAPI
from pydantic import BaseModel

from predict import predict_dish
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Ingredients(BaseModel):
    ingredients: list[str]

@app.get("/")

def home():
    return {
        "message": "Cookbot AI backend running"
    }

@app.post("/recommend")

def recommend(data: Ingredients):

    dish, steps = predict_dish(
        data.ingredients
    )

    return {
        "dish": dish,
        "steps": steps
    }