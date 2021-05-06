const Customer = require("../models/customer");
const argon2 = require("argon2");
const generateToken = require("../service/GenerateToken");

const CustomerController = {
  createCustomer: async (req, res) => {
    try {
      console.log(req.body);
      const newCustomer = new Customer({
        username: req.body.username,
        adresse: req.body.adresse,
        email: req.body.email,
        password: req.body.password,
        numberphone: req.body.numberphone,
      });

      const data = await newCustomer.save();
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).send("Erreur lors de l'ajout du client");
    }
  },
  getAllCustomer: async (req, res) => {
    await Customer.find()
      .exec()
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send("Erreur lors de la récupération des données");
      });
  },

  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Customer.findOne({ email });

      if (!user) {
        return res
          .status(401)
          .send("Erreur de mot de passe et/ou de nom d'utilisateur");
      }
      const match = await argon2.verify(user.password, password);
      if (!match) {
        return res
          .status(401)
          .json("Erreur de mot de passe et/ou d'utilisateur");
      }
      generateToken.generateToken().then((response) => {
        console.log(response.data.access_token);
        const user_id = {
          id: user._id,
          user: true,
          token: response.data.access_token,
        };

        res.status(200).json(user_id);
      });
    } catch (error) {
      res.status(500).send("Erreur lors du login", error);
    }
  },
  ProfileByID: async (req, res) => {
    const id = req.params.id;
    await Customer.findById(id)
      .exec()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send("Erreur/ id n'existe pas", err);
      });
  },
};
module.exports = CustomerController;
