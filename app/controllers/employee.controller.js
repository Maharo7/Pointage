const Employee = require('../models/employee.model');

exports.saveEmployee = async (req, res) => {
    try {
        const { name, firstName = null, department = null } = req.body;
        if (!name || name.trim() === ''){
            return res.status(400).json({ error: 'Le paramètre name est requis.' });
        };
        const newEmployee = new Employee({
            name: name,
            firstName: firstName,
            dateCreated: new Date(),
            department: department
        });
        await newEmployee.save();
        res.status(201).json({ message: 'Employé créé avec succès.', newEmployee });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de l\'employé.' });
    };
};

exports.getAllEmployee = async (req, res) => {
    try {
        const dateParam = req.query.dateCreated;
        let query = {};
        if(dateParam){
            const dateCreatedParam = new Date(dateParam);
            const startDate = new Date(dateCreatedParam);
            const endDate = new Date(startDate);
            endDate.setHours(23, 59, 59, 999); // toute la journée
            query = {
                dateCreated: {
                    $gte: startDate,
                    $lte: endDate
                }
            };
        }
        const employeeData = await Employee.find(query);
        if(employeeData === null || employeeData === undefined){
            return res.status(500).json({error: 'Erreur lors de la récuperation des données des employés dans la base'});
        }
        res.json(employeeData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récuperation des données des employés dans la base, error : ' +error.message }); 
    }
};