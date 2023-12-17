from pydantic import BaseModel


class Polar(BaseModel):
    id: int
    polarName: str
