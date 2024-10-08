from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from keras.models import load_model
import collections
import pandas as pd

# Initialize FastAPI app
app = FastAPI()
# Load the pre-trained Keras model (e.g., the one you saved earlier)
print("! ! ! MACHINE LEARNING MODEL LOADING ! ! !")
model = load_model("ml_artifacts/lstm_v1.keras")
print("! ! ! MACHINE LEARNING MODEL LOADED ! ! !")

# Sample data - UserIDs, course sequences and scores


def build_dataset(words):
    count = collections.Counter(words).most_common()
    dictionary = dict()
    for word, _ in count:
        dictionary[word] = len(dictionary) + 1
    reverse_dictionary = dict(zip(dictionary.values(), dictionary.keys()))
    return dictionary, reverse_dictionary


courses_data = pd.read_csv("csv/data.csv")

courses_dict, reverse_course_dict = (build_dataset(courses_data["course_id"]))

# Define the input data schema using Pydantic


class ModelInput(BaseModel):
    # A list of lists containing sequences of integers (course IDs)
    sequences: list[list[int]]

# Define the predict route


@app.post("/predict/")
async def predict(input_data: ModelInput):
    # Extract sequences from the input data
    print("REQUEST: ", input_data.sequences[0])
    input = []
    if (len(input_data.sequences[0]) == 0):
        input.append(0)

    for n in input_data.sequences[0]:
        input.append(courses_dict[n])

    # Make predictions using the model
    predictions = model.predict(np.array([input]))
    sorted = np.argsort(predictions)

    res = []
    for i in range(1, 4):
        res.append(reverse_course_dict[int(sorted[0][i * -1])])
    print("PRED: ", res)
    # Return the predicted course IDs as a JSON response
    return {"predicted_course_ids": res}
