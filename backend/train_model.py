import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

import pickle
import os

# Load dataset
data = pd.read_csv("data/recipes_dataset.csv")

X = data["ingredients"]
y = data["dish"]

# Convert text to numbers
vectorizer = TfidfVectorizer()

X_vectorized = vectorizer.fit_transform(X)

# Train model
model = MultinomialNB()

model.fit(X_vectorized, y)

# Create model folder if not exists
os.makedirs("model", exist_ok=True)

# Save model
pickle.dump(
    model,
    open("model/model.pkl", "wb")
)


pickle.dump(
    vectorizer,
    open("model/vectorizer.pkl", "wb")
)

print("Model trained successfully")