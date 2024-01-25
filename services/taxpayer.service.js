const db = require("../db");
const bcrypt = require("bcrypt");

module.exports.getAllEmployees = async () => {
  const [records] = await db.query("SELECT * FROM employees");
  return records;
};

module.exports.getEmployeeById = async (id) => {
  const [[record]] = await db.query("SELECT * FROM employees WHERE id = ?", [
    id,
  ]);
  return record;
};

module.exports.deleteEmployee = async (id) => {
  const [{ affectedRows }] = await db.query(
    "DELETE FROM employees WHERE id = ?",
    [id]
  );
  console.log(affectedRows);
  return affectedRows;
};

module.exports.addEmployee = async (obj, id = 0) => {
  // Insert new employee
  const query =
    "INSERT INTO employees (name, employee_code, salary) VALUES (?, ?, ?)";
  const queryParams = [obj.name, obj.employee_code, obj.salary];

  try {
    const [result] = await db.query(query, queryParams);
    // result.insertId will have the ID of the newly inserted row
    // return result.insertId;
  } catch (error) {
    console.error("Error executing SQL query:", error);
    throw error; // Handle the error as needed
  }
};



module.exports.updateEmployee = async (obj) => {
  // Update existing employee
  const query =
    "UPDATE employees SET name = ?, employee_code = ?, salary = ? WHERE id = ?";
  const queryParams = [obj.name, obj.employee_code, obj.salary, obj.id];

  try {
    const [result] = await db.query(query, queryParams);
    // result.affectedRows will have the number of affected rows
    console.log(result);
    return result.affectedRows;
  } catch (error) {
    console.error("Error executing SQL query:", error);
    throw error; // Handle the error as needed
  }
};


module.exports.addTaxpayer = async (obj) => {


  const hashedPw = await bcrypt.hash(obj.password.toString(), 8);

  // Insert new taxpayer
  const query =
    "INSERT INTO details (email,password,name,address,tin,nameofemployer,mobileno,officeno,homeno,birthday) VALUES (?,?,?,?,?,?,?,?,?,?)";
  const queryParams = [
    obj.email,
    hashedPw,
    obj.name,
    obj.address,
    obj.tin,
    obj.nameofemployer,
    obj.mobileno,
    obj.officeno,
    obj.homeno,
    obj.birthday,
  ];

  try {
    const [result] = await db.query(query, queryParams);
  } catch (error) {
    console.error("Error executing SQL query:", error);
    throw error;
  }
};


module.exports.loginTaxpayer = async (obj) => {

  // Insert new taxpayer
  const query =
    "SELECT * FROM details WHERE email = ?";
  const queryParams = [
    obj.email
  ];

  try {
    const [[data]] = await db.query(query, queryParams);
    const isMatch = await bcrypt.compare(obj.password.toString(),data.password)
    if(!isMatch){
      throw new Error()
    }else{
      return data
      data
    }
    

  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};




