import Express from "express";

import {createOrLoad_File} from "./DATA/loadSaveData.js";
import { initializeEmployeesArr } from "./SRC/Services/employee.service.js";
import {router as apiRouter} from "./SRC/Routers/index.router.js";

// load students data and put them in array
const data = await createOrLoad_File();
initializeEmployeesArr(data);

const app = Express();

app.use(Express.json());

app.use("/api", apiRouter);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});