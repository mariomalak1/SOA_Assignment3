import { saveDataToFile } from "../../DATA/loadSaveData.js";

import { employees } from "../Services/employee.service.js";


// "FirstName": "Sam",
//         "LastName": "Jackson",
//         "EmployeeID": 1000,
//         "Designation": "Manager",
//         "KnownLanguages": []

export const getAllEmpolyees = async (req, res) => {
    const {FirstName, LastName, EmployeeID, Designation} = req.query;

    const searchFieldArr = [];

    if(Designation){
        searchFieldArr.push({Designation});
    }

    if(EmployeeID){
        searchFieldArr.push({EmployeeID});
    }

    let data = employees;

    searchFieldArr.forEach(field => {

        Object.keys(field).forEach(fieldName => {            
            data = data.filter((e) => {
                console.log(e[fieldName],  field[fieldName]);
                
                return e[fieldName] === field[fieldName]
            })
        })
    });

    return res.status(200).json({data: data});
}


export const addEmpolyee = async (req, res) => {
    const {FirstName, LastName, EmployeeID, Designation, KnownLanguages} = req.body;

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
        FirstName, LastName, EmployeeID, Designation, KnownLanguages
    }

    employees.push(employee);
    saveDataToFile(employees);
    return res.status(201).json(employee);
}


export const deleteEmpolyee = async (req, res) => {
    const {EmployeeID} = req.body;

    if (!EmployeeID) {
        return res.status(400).json({ error: "Employee ID is required." });
    }

    let employeeIndex = employees.findIndex((e) =>
        e.EmployeeID === EmployeeID ? true : false
    );

    if (employeeIndex > -1) {
        return res.status(404).json({ error: "not found employee with this id" });
    }


    employees.splice(employeeIndex, 1);
    saveDataToFile(employees);
    return res.sendStatus(204);
}

