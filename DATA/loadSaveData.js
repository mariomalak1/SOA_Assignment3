import fs from "fs"

const FileName = "./DATA/employees.json";

// return array of employees
export const createOrLoad_File = async () => {
    if (fs.existsSync(FileName)) {
        const data = fs.readFileSync(FileName, "utf-8");
        const jsonData = JSON.parse(data);
        return jsonData;
    }
    else{
        const data = JSON.stringify([])
        fs.writeFileSync(FileName, data);
        return [];
    }
}


export const saveDataToFile = (employeesArr) => {
    const data = JSON.stringify(employeesArr)
    fs.writeFileSync(FileName, data);
}
