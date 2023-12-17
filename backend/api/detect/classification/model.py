import torch
import torch.nn as nn
from torchvision.models import resnet50, resnet18, ResNet18_Weights


class Encoder(nn.Module):
    def __init__(self, n_embedding=128):
        super().__init__()
        # resnetのモデル定義．ImageNetで事前学習済み．
        self.resnet_model = resnet18(weights=ResNet18_Weights.DEFAULT)
        self.resnet_model.fc = nn.Linear(  # resnetの最終出力層の次元をn_embeddingに変更
            self.resnet_model.fc.in_features, n_embedding
        )

    def forward(self, x):
        return self.resnet_model(x)


class Network(nn.Module):
    def __init__(self, in_feature, out_feature):
        super().__init__()
        self.model = nn.Sequential(
            nn.Linear(in_feature, 128),
            nn.ReLU(),
            nn.Linear(128, 32),
            nn.ReLU(),
            nn.Linear(32, out_feature),
        )

    def forward(self, x):
        return self.model(x)


class Model(nn.Module):
    """
    out_feature : 分類するクラス数
    n_embedding : 画像の中間表現に使う次元数
    """

    def __init__(self, out_feature=8, n_embedding=128):
        super().__init__()
        self.encoder = Encoder(n_embedding=n_embedding)  # 画像のEncoderネットワーク
        self.out_network = Network(  # 最終的な分類を出力するネットワーク
            in_feature=n_embedding + 2 + 1, out_feature=out_feature
        )

        self.n_embedding = n_embedding

    def forward(self, coordinates, speed, images):
        """
        Input
          - coordinates : n_batch*2のTensor
          - speed : n_batch*1のTensor
          - images : n_batch*n_channels*h_size*w_sizeのTensor
        Output
          n_batch*out_featureのTensor
        """
        image_feature = self.encoder(images)  # 画像→中間表現
        ret = torch.cat([coordinates, speed, image_feature], dim=1)  # 座標，速さ，画像の中間表現を結合
        ret = self.out_network(ret)  # 分類を出力
        return ret
