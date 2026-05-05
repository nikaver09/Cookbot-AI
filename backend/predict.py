import pickle

import pandas as pd

# Load model
model = pickle.load(
    open("model/model.pkl", "rb")
)

vectorizer = pickle.load(
    open("model/vectorizer.pkl", "rb")
)

data = pd.read_csv(
    "data/recipes_dataset.csv"
)

def predict_dish(ingredients):

    text = " ".join(
        ingredients
    )

    vector = vectorizer.transform(
        [text]
    )

    prediction = model.predict(
        vector
    )[0]

    # get cooking steps
    row = data[
        data["dish"] == prediction
    ].iloc[0]

    steps = row["steps"]

    return prediction, steps