const Housing = require("../models/housing");
const cloudinaryImageUploadMethod = require("../utils/cloudinaryImageUploadMethod");

const HousingController = {
  getAllHousing: async (req, res) => {
    await Housing.find()
      .populate("customer")
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send("Erreur lors de la récupération des données");
      });
  },
  getHousingId: async (req, res) => {
    const { id } = req.params;
    await Housing.find({ customer: id })
      .populate("customer")
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send("Erreur lors de la récupération des données");
      });
  },

  getHousingFilter: async (req, res) => {
    const { city, leasecontract, housingtype } = req.params;
    await Housing.find({
      city: city,
      leasecontract: leasecontract,
      housingtype: housingtype,
    })
      .populate("customer")
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send("Erreur lors de la récupération des données");
      });
  },
  createHousing: async (req, res) => {
    try {
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await cloudinaryImageUploadMethod(path);
        urls.push(newPath);
      }
      console.log(urls);
      const newHousing = new Housing({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        leasecontract: req.body.leasecontract,
        housingtype: req.body.housingtype,
        adresse: req.body.adresse,
        city: req.body.city,
        department: req.body.department,
        surface: req.body.surface,
        numberpieces: req.body.numberpieces,
        price: req.body.price,
        description: req.body.description,
        image: urls,
        customer: req.body.customer,
      });
      const data = await newHousing.save();
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).send("erreur");
    }
  },

  patchHousing: async (req, res) => {
    try {
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await cloudinaryImageUploadMethod(path);
        urls.push(newPath);
      }

      const { id } = req.params;
      const data = await Housing.findByIdAndUpdate(
        id,
        {
          $set: {
            price: req.body.price,
            leasecontract: req.body.leasecontract,
            image: urls,
          },
        },
        {
          multi: false,
          runValidators: true,
          omitUndefined: true,
          new: true,
        }
      );
      res.status(200).json(data);
    } catch {
      res.status(500).send("Erreur lors de la mise a jour");
    }
  },
  deleteHousing: async (req, res) => {
    const { id } = req.params;
    try {
      await Housing.findByIdAndDelete(id)
        .exec()
        .then((data) => {
          res.status(200).send(data);
        });
    } catch (error) {
      res.status(500).send("Erreur lors de la suppression");
    }
  },
};
module.exports = HousingController;
