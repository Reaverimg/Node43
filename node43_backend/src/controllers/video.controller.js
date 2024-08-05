import { responseData } from "../config/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const model = initModels(sequelize);

const getVideo = async (req, res) => {
  let data = await model.video.findAll();
  responseData(data, "successfully", 200, res);
};

const getType = async (req, res) => {
  let data = await model.video_type.findAll();
  responseData(data, "successfully", 200, res);
};

const getVideoType = async (req, res) => {
  let { typeId } = req.params;
  let data = await model.video.findAll({
    where: {
      type_id: typeId,
    },
  });
  responseData(data, "successfully", 200, res);
};

const getVideoPage = async (req, res) => {
  let pageSize = 4;
  let { page } = req.params;
  let totalPage = Math.ceil((await model.video.count()) / pageSize);
  let index = pageSize * (page - 1);
  let data = await model.video.findAll({
    offset: index,
    limit: pageSize,
  });
  responseData({ data, totalPage }, "successfully", 200, res);
};

const getVideoDetail = async (req, res) => {
  let { videoId } = req.params;
  let data = await model.video.findOne({
    where: {
      video_id: videoId,
    },
    include: ["user"],
  });
  responseData(data, "successfully", 200, res);
};

export { getVideo, getType, getVideoType, getVideoPage, getVideoDetail };
