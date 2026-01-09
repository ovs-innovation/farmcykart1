const Newsletter = require('../models/Newsletter');

const addNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({
        message: 'Email is required!',
      });
    }

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(500).send({
        message: 'This email is already subscribed!',
      });
    }

    const newNewsletter = new Newsletter({ email });
    await newNewsletter.save();

    res.status(200).send({
      message: 'Subscribed Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllNewsletter = async (req, res) => {
  try {
    const newsletters = await Newsletter.find({}).sort({ _id: -1 });
    res.send(newsletters);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteNewsletter = async (req, res) => {
  try {
    await Newsletter.deleteOne({ _id: req.params.id });
    res.status(200).send({
      message: 'Unsubscribed Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteManyNewsletter = async (req, res) => {
  try {
    const ids = req.body.ids;
    await Newsletter.deleteMany({ _id: { $in: ids } });
    res.status(200).send({
      message: 'Newsletters Deleted Successfully!',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  addNewsletter,
  getAllNewsletter,
  deleteNewsletter,
  deleteManyNewsletter,
};
