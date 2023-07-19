from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from api.models.model import Base, Polor

DB_URL = "mysql+pymysql://root@db:3306/polor?charset=utf8"
engine = create_engine(DB_URL, echo=True)

from datetime import date, datetime, time

from api.models.model import Base, DetectionTime


def reset_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    Session = sessionmaker(bind=engine)
    session = Session()

    polors_data = [
        {"id": 1, "name": "ほくと", "createdAt": "2023-01-01 00:00:00", "updatedAt": "2023-01-01 00:00:00"},
        {"id": 2, "name": "らら", "createdAt": "2023-01-01 00:00:00", "updatedAt": "2023-01-01 00:00:00"},
    ]
    generate_dummy_detection_times(session)

    for data in polors_data:
        record = Polor(id=data["id"], name=data["name"], createdAt=data["createdAt"], updatedAt=data["updatedAt"])
        session.add(record)

    session.commit()


def generate_dummy_detection_times(session):
    detection_time_data = [
        {"id": 1, "polorId": 1, "date": date(2023, 6, 1), "startTime": time(10, 0, 0), "endTime": time(11, 0, 0)},
        {"id": 2, "polorId": 1, "date": date(2023, 6, 1), "startTime": time(12, 0, 0), "endTime": time(12, 20, 0)},
        {"id": 3, "polorId": 1, "date": date(2023, 6, 1), "startTime": time(16, 20, 0), "endTime": time(17, 0, 0)},
        {"id": 4, "polorId": 1, "date": date(2023, 6, 2), "startTime": time(12, 30, 30), "endTime": time(13, 30, 20)},
        {"id": 5, "polorId": 2, "date": date(2023, 6, 3), "startTime": time(15, 45, 23), "endTime": time(16, 45, 12)},
        {
            "id": 6,
            "polorId": None,
            "date": date(2023, 6, 3),
            "startTime": time(15, 45, 23),
            "endTime": time(16, 45, 12),
        },
    ]

    for data in detection_time_data:
        record = DetectionTime(
            id=data["id"],
            polorId=data["polorId"],
            date=data["date"],
            startTime=data["startTime"],
            endTime=data["endTime"],
            createdAt=datetime.now(),
            updatedAt=datetime.now(),
        )
        session.add(record)

    session.commit()
    session.close()



if __name__ == "__main__":
    reset_database()
