from pydantic import BaseModel


class Polor(BaseModel):
    id: int
    polorName: str
