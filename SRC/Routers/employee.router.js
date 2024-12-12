import {Router} from "express";

import {addEmpolyee, getAllEmpolyees, deleteEmpolyee} from "../Controllers/employee.controller.js";

export const router = Router();

router.route("/")
    .get(getAllEmpolyees)
    .post(addEmpolyee)
    .delete(deleteEmpolyee);