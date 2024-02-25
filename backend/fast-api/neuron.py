import json
import numpy as np
from keras.models import load_model
from keras.preprocessing.text  import Tokenizer
from keras.preprocessing.sequence import pad_sequences

class SentimentClassifier:
    def __init__(self):
        with open('tokenizer.json', 'r') as f:
            config = json.load(f)
        config = config.get('config')
        self.tokenizer = Tokenizer(config)
        self.model = load_model('sentiment.h5')

    def predict(self, description:str):
        data = self.tokenizer.texts_to_sequences([description.lower()])
        data_pad = pad_sequences(data, maxlen=30)

        res = self.model.predict(data_pad)

        if res[0][1] > 0.66:
            return 1
        elif res[0][1] > 0.33:
            return 0
        else:
            return -1