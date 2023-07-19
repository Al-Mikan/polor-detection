from sqlalchemy import Column, Date, DateTime, Float, Integer, String, Time

from api.db import Base


class Polor(Base):
    __tablename__ = "polor"

    id = Column(Integer, primary_key=True)
    name = Column(String(20), nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


class DetectionTime(Base):
    __tablename__ = "detection_time"

    id = Column(Integer, primary_key=True)
    polorId = Column(Integer)
    date = Column(Date, nullable=False)
    startTime = Column(Time, nullable=False)
    endTime = Column(Time, nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


class Meal(Base):
    __tablename__ = "meal"

    id = Column(Integer, primary_key=True)
    polorId = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    meal = Column(String(50), nullable=False)
    weight = Column(Float, nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


class Temperature(Base):
    __tablename__ = "temperature"

    id = Column(Integer, primary_key=True)
    polorId = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    temperature = Column(Float, nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


class Event(Base):
    __tablename__ = "event"

    id = Column(Integer, primary_key=True)
    polorId = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    startTime = Column(Time, nullable=False)
    endTime = Column(Time, nullable=False)
    event = Column(String(100), nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


class Enrichment(Base):
    __tablename__ = "enrichment"

    id = Column(Integer, primary_key=True)
    polorId = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    startTime = Column(Time, nullable=False)
    endTime = Column(Time, nullable=False)
    enrichment = Column(String(100), nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)
