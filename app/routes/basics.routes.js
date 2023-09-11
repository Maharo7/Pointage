const employeeController = require('../controllers/employee.controller');
const checkInCheckOutController = require('../controllers/checkInCheckOut.controller');

module.exports.basicRoutes = (app) => {
    app.get('/', function (req, res) {
        res.send('Systeme pointage');
     });

    app.post('/employee', employeeController.saveEmployee);
    app.get('/employee', employeeController.getAllEmployee);

    app.post('/check-in', checkInCheckOutController.checkIn);
    app.post('/check-out', checkInCheckOutController.checkOut);
    app.get('/checkInOutEmployee', checkInCheckOutController.getAllCheckForEmployee);
    
}