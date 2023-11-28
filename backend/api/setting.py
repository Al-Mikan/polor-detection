import os
from dotenv import load_dotenv

load_dotenv(verbose=True)  # NOTE: 本番環境ではコンテナ起動時に環境変数を登録する為、.envからの読み込みはない

DEBUG = bool(int(os.environ["DEBUG"]))
ORIGIN = os.environ["BACKEND_ORIGIN"]
ROOT_DIR = os.path.abspath(os.curdir)

# URLに使用するパス
PUBLIC_MEDIA_PATH = "/media/"
PUBLIC_MEDIA_IMAGE_PATH = os.path.join(PUBLIC_MEDIA_PATH, "videos/")
