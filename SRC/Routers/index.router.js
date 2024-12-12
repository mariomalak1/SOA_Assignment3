import {Router} from "express";

import {router as employeeRouter} from "./employee.router.js";

export const router = Router();

router.use("/employees", employeeRouter);
