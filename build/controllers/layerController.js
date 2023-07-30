"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models/models");
class LayerController {
    async set(req, res) {
        try {
            const { mapLayerCoord, name } = req.body;
            console.log(name);
            if (!name || !mapLayerCoord.length) {
                return res.status(400).json('Неверные данные');
            }
            const candidateMapLayer = await models_1.MapLayer.findOne({ where: { name } });
            if (candidateMapLayer) {
                return res.status(400).json('Слой с таким именем уже существует');
            }
            const mapLayer = await models_1.MapLayer.create({ mapLayerCoord, name });
            return res.status(200).json('Слой успешно создан');
        }
        catch (error) {
            console.log(error);
        }
    }
    async getAll(req, res) {
        const layers = await models_1.MapLayer.findAll();
        return res.json(layers);
    }
    async delLayers(req, res) {
        const { layers } = req.body;
        console.log(req.body);
        if (layers) {
            layers.forEach(async (element) => {
                try {
                    // Найти элемент, который нужно удалить
                    const postToDelete = await models_1.MapLayer.findOne({
                        where: { id: element },
                    });
                    if (postToDelete) {
                        // Выполнить удаление элемента
                        await postToDelete.destroy();
                        console.log('Элемент успешно удален из базы данных.');
                        res.sendStatus(200);
                    }
                    else {
                        console.log('Элемент не найден в базе данных.');
                        res.sendStatus(404);
                    }
                }
                catch (error) {
                    console.error('Ошибка при удалении элемента из базы данных:', error);
                    res.sendStatus(404);
                }
            });
        }
    }
}
exports.default = new LayerController();
//# sourceMappingURL=layerController.js.map