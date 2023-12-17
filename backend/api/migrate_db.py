from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from api.models.model import Base, Polar, DetectionTime, Cage

DB_URL = "mysql+pymysql://root@db:3306/polar?charset=utf8"
engine = create_engine(DB_URL, echo=True)

from datetime import date, datetime, time


def reset_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    Session = sessionmaker(bind=engine)
    session = Session()

    polars_data = [
        {
            "id": 1,
            "polarName": "ほくと",
            "createdAt": "2023-01-01 00:00:00",
            "updatedAt": "2023-01-01 00:00:00",
        },
        {
            "id": 2,
            "polarName": "らら",
            "createdAt": "2023-01-01 00:00:00",
            "updatedAt": "2023-01-01 00:00:00",
        },
    ]
    cage_data = [
        {
            "id": 1,
            "cageName": "飼育場所A",
            "createdAt": "2023-01-01 00:00:00",
            "updatedAt": "2023-01-01 00:00:00",
        },
        {
            "id": 2,
            "cageName": "飼育場所B",
            "createdAt": "2023-01-01 00:00:00",
            "updatedAt": "2023-01-01 00:00:00",
        },
    ]

    for data in polars_data:
        record = Polar(
            id=data["id"],
            polarName=data["polarName"],
            createdAt=data["createdAt"],
            updatedAt=data["updatedAt"],
        )
        session.add(record)
    for data in cage_data:
        record = Cage(
            id=data["id"],
            cageName=data["cageName"],
            createdAt=data["createdAt"],
            updatedAt=data["updatedAt"],
        )
        session.add(record)

    session.commit()
    session.close()


if __name__ == "__main__":
    reset_database()
