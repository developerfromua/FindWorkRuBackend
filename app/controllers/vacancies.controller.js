const Vacancy = require("../models/vacancy.model.js");
// Create and Save a new Vacancy
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Vacancy
  const vacancy = new Vacancy(req.body);
  // Save Vacancy in the database
  Vacancy.create(vacancy, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vacancy."
      });
    else res.send(data);
  });
};
// Retrieve all Vacancies from the database (with condition).
exports.findByPage = (req, res) => {
    const title = req.query.title;
    const city = req.query.city;
    const category = req.query.category;
    const work_exp = req.query.work_exp;
    const business = req.query.business;
    const schedule = req.query.schedule;
    const page = req.params.page;
    Vacancy.getByPage(title, city, category, work_exp, business, schedule, page, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vacancies."
      });
    }
    else if (data.length == 0) {
      res.status(404).send({
        message: "Not found"
      });
    }
    else {
      res.send(data);
    }
  });
};
// Find a single Vacancy with a id
exports.findOne = (req, res) => {
    Vacancy.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Vacancy with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Vacancy with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};
// Update a Vacancy identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      console.log(req.body);
      Vacancy.updateById(
        req.params.id,
        new Vacancy(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Vacancy with id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Vacancy with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};
// Delete a Vacancy with the specified id in the request
exports.delete = (req, res) => {
    Vacancy.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Vacancy with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Vacancy with id " + req.params.id
            });
          }
        } else res.send({ message: `Vacancy was deleted successfully!` });
      });
};