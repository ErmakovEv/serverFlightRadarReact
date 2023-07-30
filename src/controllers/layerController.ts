import express = require('express');
import { MapLayer } from '../models/models';
import { IGetUserAuthInfoRequest } from '../utils/utils';

class LayerController {
  async set(req: express.Request, res: express.Response) {
    try {
      const { mapLayerCoord, name } = req.body;
      console.log(name);

      if (!name || !mapLayerCoord.length) {
        return res.status(400).json('Неверные данные');
      }

      const candidateMapLayer = await MapLayer.findOne({ where: { name } });
      if (candidateMapLayer) {
        return res.status(400).json('Слой с таким именем уже существует');
      }

      const mapLayer = await MapLayer.create({ mapLayerCoord, name });

      return res.status(200).json('Слой успешно создан');
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(req: express.Request, res: express.Response) {
    const layers = await MapLayer.findAll();
    return res.json(layers);
  }

  async delLayers(req: IGetUserAuthInfoRequest, res: express.Response) {
    const { layers } = req.body;
    console.log(req.body);
    if (layers) {
      layers.forEach(async (element: number) => {
        try {
          // Найти элемент, который нужно удалить
          const postToDelete = await MapLayer.findOne({
            where: { id: element },
          });

          if (postToDelete) {
            // Выполнить удаление элемента
            await postToDelete.destroy();
            console.log('Элемент успешно удален из базы данных.');
            res.sendStatus(200);
          } else {
            console.log('Элемент не найден в базе данных.');
            res.sendStatus(404);
          }
        } catch (error) {
          console.error('Ошибка при удалении элемента из базы данных:', error);
          res.sendStatus(404);
        }
      });
    }
  }
}

export default new LayerController();
