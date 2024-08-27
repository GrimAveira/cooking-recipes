from fastapi import FastAPI
from typing import List
from pydantic import BaseModel
from neuron import SentimentClassifier

model=SentimentClassifier()

class Item(BaseModel):
    id: int
    recipe:int
    description: str
    sentiment: int

app = FastAPI()

@app.get("/")
async def root(items:  List[Item]):
    updated_items = [Item(id=item.id, recipe=item.recipe, description=item.description, sentiment=model.predict(item.description)) for item in items]
    print(updated_items)
    return updated_items