from pydantic import BaseModel


class CageBase(BaseModel):
    cageName: str


class CageCreate(CageBase):
    pass


class CageCreateResponse(CageCreate):
    id: int

    class Config:
        orm_mode = True


class Cage(CageBase):
    id: int

    class Config:
        orm_mode = True
