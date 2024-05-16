import json
from keras.models import load_model
from keras.preprocessing.text  import tokenizer_from_json
from keras.preprocessing.sequence import pad_sequences

class SentimentClassifier:
    def __init__(self):
        with open('tokenizer.json') as f:
            data = json.load(f)
        self.tokenizer = tokenizer_from_json(data)
        self.model = load_model('sentiment.h5')

    def predict(self, description:str):
        data = self.tokenizer.texts_to_sequences([description.lower()])
        data_pad = pad_sequences(data, maxlen=30)

        res = self.model.predict(data_pad)

        print(res)

        if res[0][1] > 0.55:
            return 1
        elif res[0][1] > 0.45:
            return 0
        else:
            return -1