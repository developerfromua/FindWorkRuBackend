const sql = require("./db.js");
// constructor
const Vacancy = function(vacancy) {
    this.vacancy_uid = vacancy.vacancy_uid;
    this.vacancy_name = vacancy.vacancy_name;
    this.vacancy_salary = vacancy.vacancy_salary;
    this.vacancy_description = vacancy.vacancy_description;
    this.vacancy_owner_uid = vacancy.vacancy_owner_uid;
    this.date = vacancy.date;
    this.category = vacancy.category;
    this.education = vacancy.education;
    this.work_exp = vacancy.work_exp;
    this.business = vacancy.business;
    this.schedule = vacancy.schedule;
    this.city = vacancy.city;
    this.phone = vacancy.phone;
    this.company = vacancy.company;

};
Vacancy.create = (newVacancyData, result) => {
  sql.query("INSERT INTO vacancies SET ?", newVacancyData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created vacancy: ", { ...newVacancyData });
    result(null, { ...newVacancyData });
  });
};
Vacancy.findById = (id, result) => {
  sql.query(`SELECT * FROM vacancies WHERE vacancy_uid = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found vacancy: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Vacancy with the id
    result({ kind: "not_found" }, null);
  });
};
Vacancy.getByPage = (title, city, category, work_exp, business, schedule, page, result) => {
  let query = "SELECT *, DATE_FORMAT(date,'%d/%m/%Y') AS date FROM vacancies";
  if (title || city || category || work_exp || business || schedule) {
    query += ` WHERE 1=1`;
    if(title) {
    query += ` AND vacancy_name LIKE '%${title}%'`;
    query += ` OR vacancy_description LIKE '%${title}%'`;
    }
    if (city) {
      query += ` AND city = '${city}'`;
    }
    if (category) {
      query += ` AND category = '${category}'`;
    }
    if (work_exp) {
      query += ` AND work_exp = '${work_exp}'`;
    }
    if (business) {
      query += ` AND business = '${business}'`;
    }
    if (schedule) {
      query += ` AND schedule = '${schedule}'`;
    }
 }
  query += ` LIMIT 10 OFFSET ${page*10-10}`;
  console.log(query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
  //  console.log("vacancies: ", res);
    result(null, res);
  });
};
Vacancy.updateById = (id, vacancyReqData, result) => {
  sql.query("UPDATE vacancies SET vacancy_name=?, vacancy_salary=?, vacancy_description=?, vacancy_owner_uid=?, date=?, category=?, education=?, work_exp=?, business=?, schedule=?, city=?, phone=?, company=? WHERE vacancy_uid = ?", [vacancyReqData.vacancy_name,vacancyReqData.vacancy_salary,vacancyReqData.vacancy_description,vacancyReqData.vacancy_owner_uid,vacancyReqData.date, vacancyReqData.category, vacancyReqData.education, vacancyReqData.work_exp, vacancyReqData.business, vacancyReqData.schedule, vacancyReqData.city, vacancyReqData.phone, vacancyReqData.company, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Vacancy with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated vacancy: ", { id: id, ...vacancyReqData });
      result(null, { id: id, ...vacancyReqData });
    }
  );
};
Vacancy.remove = (id, result) => {
  sql.query("DELETE FROM vacancies WHERE vacancy_uid = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Vacancy with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted vacancy with id: ", id);
    result(null, res);
  });
};
module.exports = Vacancy;