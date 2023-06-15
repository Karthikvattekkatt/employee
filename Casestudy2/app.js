const express = require('express');
const path=require('path');
const app = express();
const port = 3000;
const employeeSchema=mongoose.Schema({
    employeeName:String,
    employeeLocation:String,
    employeePosition:String,
    employeeSalary:Number
    });
    const employeelist=mongoose.model('employees',employeeSchema);
    module.exports=employeelist;

// Task 1: Initiate app and run server at 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/employeedb')
.then(()=>{
    console.log('Connected to my local DB');
})
.catch(()=>{
    console.log('Error!!! Connection lost');
})


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist', (req, res) => {
    res.json(data.employeelist);
  });


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < data.employeelist.length) {
      res.json(data.employeelist[index]);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  });



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', (req, res) => {
    const newEmployee = req.body;
    data.employeelist.push(newEmployee);
    saveDataToFile();
    res.json(newEmployee);
  });




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < data.employeelist.length) {
      const deletedEmployee = data.employeelist.splice(index, 1);
      saveDataToFile();
      res.json(deletedEmployee[0]);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  });




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist/:id', (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < data.employeelist.length) {
      data.employeelist[index] = req.body;
      saveDataToFile();
      res.json(data.employeelist[index]);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  });

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



