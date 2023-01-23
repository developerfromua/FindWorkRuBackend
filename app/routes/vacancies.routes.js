module.exports = app => {
    const vacancies = require("../controllers/vacancies.controller.js");
    var router = require("express").Router();
    // Create a new Vacancy
    router.post("/", vacancies.create);
    // Retrieve all Vacancies
    router.get("/page/:page", vacancies.findByPage);
    // Retrieve a single Vacancy with id
    router.get("/:id", vacancies.findOne);
    // Update a Vacancy with id
    router.put("/:id", vacancies.update);
    // Delete a Vacancy with id
    router.delete("/:id", vacancies.delete);

    app.use('/api/vacancies', router);
  };