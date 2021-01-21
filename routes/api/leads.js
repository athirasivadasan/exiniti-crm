const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateLeadInput = require("../../validation/lead");
// Load Lead model
const Lead = require("../../models/Lead");

router.post("/create", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLeadInput(req.body); // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Lead.findOne({ client_email: req.body.client_email }).then((lead) => {
        if (lead) {
            return res.status(400).json({ client_email: "Client Email already exists" });
        } else {
            const newLead = new Lead({
                client_name: req.body.client_name,
                client_email: req.body.client_email,
                client_phone: req.body.client_phone,
                status: 1,
            });
            newLead
                .save()
                .then((lead) => res.json(lead))
                .catch((err) => console.log(err));
        }
    });
});

router.get("/list", (req, res) => {
    Lead.find({}, function (err, leads) {
        res.send(leads);
    });
});


router.delete('/delete/:id', function (req, res) {
    console.log("DELETE review",req.params.id)
    Lead.findByIdAndRemove(req.params.id)
    .then((lead) => res.json(lead))
    .catch((err) => {
      console.log(err.message);
    })
  })

module.exports = router;
