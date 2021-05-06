const express = require("express");

const MailgunControls = require("../../controllers/MailGunController");

const router = new express.Router();

router.post("/sendmail", MailgunControls.CreateMail);

module.exports = router;
