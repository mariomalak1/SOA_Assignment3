import { Router } from "express";

import * as controller from "../Controllers/employee.controller.js";

export const router = Router();

router
  .route("/")
  .get(controller.getAllEmployees)
  .post(controller.deleteEmployee)
  .delete(controller.deleteEmployee)
  .put(controller.updateEmployee);

  router.get("/java50", controller.getEmployeesWithGT50Java);