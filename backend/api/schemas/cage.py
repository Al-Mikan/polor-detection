from pydantic import BaseModel


class Cage(BaseModel):
    id: int
    cageName: str
