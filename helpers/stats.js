const models = require('../models');
const async = require('async');

module.exports = (callback) => {
  async.parallel ([
    (next) => {
      models.Image.countDocuments({}, next);
    },
    (next) => {
      models.Comment.countDocuments({}, next);
    },
    (next) => {
      models.Image.aggregate([
        {
        $group: {
          _id: '1',
          viewsTotal: { $sum: '$views' }
        }
      }], (err, result) => {
        let viewsTotal = 0;
        if (result.length > 0) {
          viewsTotal += result[0].viewsTotal;
        }
        next(null, viewsTotal);
      }
    );
    },
    (next) => {
      models.Image.aggregate([
        {
        $group: {
          _id: '1',
          likesTotal: { $sum: '$likes' }
        }
      }], (err, result) => {
        let likesTotal = 0;
        if (result.length > 0) {
          likesTotal += result[0].likesTotal;
        }
        next(null, likesTotal);
      }
    );
    }
  ], (err, results) => {
    callback(null, {
      images: results[0],
      comments: results[1],
      views: results[2],
      likes: results[3]
    });
  });
};
