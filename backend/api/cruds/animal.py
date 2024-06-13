from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import Animal
import api.schemas.animal as schema

from datetime import datetime


async def get_animals(db: AsyncSession):
    stmt = select(
        Animal.id,
        Animal.animalName,
        Animal.species,
    ).order_by(Animal.id)

    result = await db.execute(stmt)
    animals = result.fetchall()

    formatted_animals = []
    for animal in animals:
        formatted_animals.append(
            {
                "id": animal.id,
                "animalName": animal.animalName,
                "species": animal.species,
            }
        )

    return formatted_animals


async def create_animal(db: AsyncSession, animal: schema.AnimalCreate):
    new_animal = Animal(
        animalName=animal.animalName,
        species=animal.species,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )

    db.add(new_animal)
    await db.commit()
    await db.refresh(new_animal)

    return new_animal


async def get_animal_by_id(id: int, db: AsyncSession):
    stmt = select(Animal).where(Animal.id == id)
    result = await db.execute(stmt)
    animal = result.scalar_one_or_none()
    return animal


async def update_animal(db: AsyncSession, animal: schema.AnimalBase, original: Animal):
    original.animalName = animal.animalName
    original.species = animal.species
    original.updatedAt = datetime.now()

    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original


async def delete_animal(db: AsyncSession, id: int):
    stmt = select(Animal).where(Animal.id == id)
    result = await db.execute(stmt)
    animal = result.scalars().first()

    if animal is None:
        return None

    await db.delete(animal)
    await db.commit()
    return animal
