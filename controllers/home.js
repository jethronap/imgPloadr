const sidebar = require('../helpers/sidebar');
ImageModel = require('../models').Image;

module.exports = {
  index: (req, res) => {
    const viewModel = {
        images: []
    };

    ImageModel.find({}, {}, { sort: { timestamp: -1 } },
      (err, images) => {
        if (err) { throw err; }

        viewModel.images = images;
        sidebar(viewModel, (ViewModel) => {
          res.render('index', viewModel);
        });
      });

    }
};
