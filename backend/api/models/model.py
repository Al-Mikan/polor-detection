from sqlalchemy import Column, Date, DateTime, Float, Integer, String, Time, Boolean

from api.db import Base


class Polor(Base):
    __tablename__ = "polor"

    id = Column(Integer, primary_key=True)
    polorName = Column(String(20), nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


class Cage(Base):
    __tablename__ = "cage"

    id = Column(Integer, primary_key=True)
    cageName = Column(String(30), nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


class PolorCageLog(Base):
    __tablename__ = "polor_cage_log"

    id = Column(Integer, primary_key=True, autoincrement=True)
    polorId = Column(Integer, nullable=False)
    cageId = Column(Integer, nullable=False)
    date = Column(Date, primary_key=True, nullable=False, unique=True)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


################################################################環境
##温度
class Temperature(Base):
    __tablename__ = "temperature"

    id = Column(Integer, primary_key=True)
    polorId = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    temperature = Column(Float, nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


##プール掃除
class PoolCleaning(Base):
    __tablename__ = "pool_cleaning"

    id = Column(Integer, primary_key=True)
    polorId = Column(Integer, nullable=False)
    date = Column(Date, nullable=False, unique=True)
    poolCleaning = Column(Boolean, nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


##収用回数
class Expropriation(Base):
    __tablename__ = "expropriation"

    id = Column(Integer, primary_key=True)
    polorId = Column(Integer, nullable=False)
    date = Column(Date, nullable=False, unique=True)
    expropriation = Column(Integer, nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


class Training(Base):
    __tablename__ = "training"

    id = Column(Integer, primary_key=True)
    polorId = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    training = Column(String(100), nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


#############################################################給餌
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


class Water(Base):
    __tablename__ = "water"

    id = Column(Integer, primary_key=True)
    polorId = Column(Integer, nullable=False)
    date = Column(Date, nullable=False, unique=True)
    value = Column(Float, nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


########################################################排泄


class Excretion(Base):
    __tablename__ = "excretion"

    id = Column(Integer, primary_key=True)
    polorId = Column(Integer, nullable=False)
    date = Column(Date, nullable=False, unique=True)
    number = Column(Integer, nullable=False)
    status = Column(String(20), nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


########################################################行動
class DetectionTime(Base):
    __tablename__ = "detection_time"

    id = Column(Integer, primary_key=True)
    date = Column(Date, nullable=False)
    cageId = Column(Integer, nullable=False)
    startTime = Column(Time, nullable=False)
    endTime = Column(Time, nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


class WakeUpTime(Base):
    __tablename__ = "wake_up_time"

    id = Column(Integer, primary_key=True)
    polorId = Column(Integer, nullable=False)
    date = Column(Date, nullable=False, primary_key=True)
    time = Column(Time, nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


##################################################エンリッチメント


class Event(Base):
    __tablename__ = "event"

    id = Column(Integer, primary_key=True)
    polorId = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    event = Column(String(100), nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


class Enrichment(Base):
    __tablename__ = "enrichment"

    id = Column(Integer, primary_key=True)
    polorId = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    enrichment = Column(String(100), nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


####################################################メモ


class Memo(Base):
    __tablename__ = "memo"

    id = Column(Integer, primary_key=True)
    polorId = Column(Integer, nullable=False)
    date = Column(Date, nullable=False, primary_key=True)
    memo = Column(String(500), nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)


###################################################ビデオ
class Video(Base):
    __tablename__ = "video"

    id = Column(Integer, primary_key=True)
    polorId = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    video_path = Column(String(100), nullable=False)
    createdAt = Column(DateTime, nullable=False)
    updatedAt = Column(DateTime, nullable=False)
