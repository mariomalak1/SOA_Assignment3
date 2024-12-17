import { saveDataToFile } from "../../DATA/loadSaveData.js";

import { employees } from "../Services/employee.service.js";

// "FirstName": "Sam",
//         "LastName": "Jackson",
//         "EmployeeID": 1000,
//         "Designation": "Manager",
//         "KnownLanguages": []

export const getAllEmployees = async (req, res) => {
  const { FirstName, LastName, EmployeeID, Designation } = req.query;

  const searchFieldArr = [];

  if (Designation) {
    searchFieldArr.push({ Designation });
  }

  if (EmployeeID) {
    searchFieldArr.push({ EmployeeID });
  }

  let data = employees;

  searchFieldArr.forEach((field) => {
    Object.keys(field).forEach((fieldName) => {
      data = data.filter((e) => {
        console.log(e[fieldName], field[fieldName]);

        return e[fieldName] === field[fieldName];
      });
    });
  });

  return res.status(200).json({ data: data });
};

export const addEmployee = async (req, res) => {
  const { FirstName, LastName, EmployeeID, Designation, KnownLanguages } =
    req.body;

  if (!FirstName || !LastName || !EmployeeID || !Designation) {
    return res.status(400).json({ error: "missing data" });
  }

  let employeeIndex = employees.findIndex((e) =>
    e.EmployeeID === EmployeeID ? true : false
  );

  if (employeeIndex > -1) {
    return res.status(400).json({ error: "this id is already added" });
  }

  const employee = {
    FirstName,
    LastName,
    EmployeeID,
    Designation,
    KnownLanguages,
  };

  employees.push(employee);
  saveDataToFile(employees);
  return res.status(201).json(employee);
};

export const deleteEmployee = async (req, res) => {
  const { EmployeeID } = req.body;

  if (!EmployeeID) {
    return res.status(400).json({ error: "Employee ID is required." });
  }

  let employeeIndex = employees.findIndex((e) =>
    e.EmployeeID === EmployeeID ? true : false
  );

  if (employeeIndex === -1) {
    return res.status(404).json({ error: "not found employee with this id" });
  }

  employees.splice(employeeIndex, 1);
  saveDataToFile(employees);
  return res.sendStatus(204);
};

// update employee
export const updateEmployee = async (req, res) => {
  // Extract the EmployeeID from the request body
  const { EmployeeID } = req.body;

  if (!EmployeeID) {
    return res.status(400).json({ error: "Employee ID is required." });
  }

  // Find the employee with the EmployeeID
  const employeeToUpdate = employees.find((e) => e.EmployeeID === EmployeeID);

  // Check if the employee exists
  if (!employeeToUpdate) {
    return res.status(404).json({ error: "Employee not found" });
  }

  // Update the employee with the new data
  Object.keys(req.body).forEach((key) => {
    employeeToUpdate[key] = req.body[key];
  });

  // Save the updated data to the file
  saveDataToFile(employees);

  // Return the updated employee
  return res.status(200).json({
    message: "Employee updated successfully",
    data: employeeToUpdate,
  });
};

// Retrieve employee by id
export const getEmployeesWithGT50Java = async (req, res) => {
    // Filter employees with KnownLanguages containing Java with ScoreOutOf100 > 50
    const requiredEmployees = employees.filter((e) => {
      return e.KnownLanguages.some(
        (lang) => lang.LanguageName === "Java" && lang.ScoreOutOf100 > 50
      );
    });
  
    // Sort employees in ascending order of Java score
    requiredEmployees.sort((a, b) => {
      const scoreA = a.KnownLanguages.find(
        (lang) => lang.LanguageName === "Java"
      ).ScoreOutOf100;
      const scoreB = b.KnownLanguages.find(
        (lang) => lang.LanguageName === "Java"
      ).ScoreOutOf100;
      return scoreA - scoreB;
    });
  
    // Return the list of employees
    return res.status(200).json({ data: requiredEmployees });
  };
  
