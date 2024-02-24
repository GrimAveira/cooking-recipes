from fastapi import FastAPI
from typing import List
from pydantic import BaseModel

class Item(BaseModel):
    id: int
    sentiment: int

app = FastAPI()

@app.get("/")
async def root(item:  List[Item]):
    print(item)
    return {"message": "Hello World"}