import {Router} from "express";

import {addEmpolyee, getAllEmpolyees, employeesKnownSpecificLang} from "../Controllers/employee.controller.js";

export const router = Router();

router.route("/")
    .get(getAllEmpolyees)
    .post(addEmpolyee);