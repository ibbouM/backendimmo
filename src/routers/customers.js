const express = require("express");

const CustomerControls = require("../../controllers/CustomerController");

const router = new express.Router();

const  checkjwt = require('../../service/Checkjwt');

// sign up
router.post("/customers", CustomerControls.createCustomer);

//Authentification qui va me générer un token avec auth0
router.post("/login", CustomerControls.Login) 

//Page profile par client (id) sécurisé avec Auth0 (Personne ne pourra y accéder sans Token (Obtenu avec authentification))
router.get("/profile/:id", checkjwt, CustomerControls.ProfileByID)

// Profile de tout les clients (sans id)
router.get("/profile",checkjwt, CustomerControls.getAllCustomer);



module.exports = router;
