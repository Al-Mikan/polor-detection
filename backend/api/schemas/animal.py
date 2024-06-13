from pydantic import BaseModel


class AnimalBase(BaseModel):
    animalName: str
    species: str


class AnimalCreate(AnimalBase):
    pass


class AnimalCreateResponse(AnimalCreate):
    id: int

    class Config:
        orm_mode = True


class Animal(AnimalBase):
    id: int

    class Config:
        orm_mode = True
