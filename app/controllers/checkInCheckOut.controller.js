const checkInCheckOut = require('../models/checkInCheckOut.model');
const Employee = require('../models/employee.model');
const mongoose = require('mongoose');

exports.checkIn = async (req, res) => {
    try {
        const { employeeId, comment = null} = req.body;
        if (!employeeId) {
            return res.status(400).json({ error: 'Le paramètre employeeId est requis.' });
        };
        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(404).json({ error: 'L\'ID spécifié n\'est pas valide.' });
        }
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'L\'employé avec l\'ID spécifié n\'existe pas.' });
        }

        // Recherche du dernier check-in pour cet employé
        const lastCheckIn = await checkInCheckOut.findOne({ employeeId }).sort({ checkInTime: -1 });

        if (lastCheckIn) {
            if(!lastCheckIn.checkOutTime) {
                return res.status(404).json({ error: 'Veuillez-vous check-out avant de faire un check-in.' });
            }
        }

        const checkInTime = new Date();
        const checkInData = new checkInCheckOut({
            employeeId : employeeId,
            comment : comment,
            checkInTime : checkInTime,
            checkOutTime : null
        });
        await checkInData.save();
        res.status(200).json({ message: 'Check-in enregistré avec succès.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement du check-in. '+error });
    }
  };

  exports.checkOut = async (req, res) => {
    try {
        const { employeeId, comment = null} = req.body;
        if (!employeeId) {
            return res.status(400).json({ error: 'Le paramètre employeeId est requis.' });
        };
        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(404).json({ error: 'L\'ID spécifié n\'est pas valide.' });
        }
            // Recherche du dernier check-in pour cet employé
        const lastCheckIn = await checkInCheckOut.findOne({ employeeId }).sort({ checkInTime: -1 });

        if (!lastCheckIn) {
            return res.status(400).json({ error: 'Aucun check-in trouvé .' });
        }
        if( lastCheckIn.checkOutTime ) {
            return res.status(400).json({ error: 'Check-out déja effectué . Veuillez-vous check-in.' });
        }

            // Durree de travail
        lastCheckIn.comment = comment;
        lastCheckIn.checkOutTime = new Date();

        const durationInMilliseconds = lastCheckIn.checkOutTime - lastCheckIn.checkInTime;

        lastCheckIn.duration = durationInMilliseconds;

        await lastCheckIn.save();
        res.status(200).json({ message: 'Check-out enregistré avec succès.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement du check-out. '+error });
    }
  };

  exports.getAllCheckForEmployee = async (req, res) => {
    try {
        const employeeId = req.query.employeeId;
        let query = {};

        if(employeeId) {
            if (!mongoose.Types.ObjectId.isValid(employeeId)) {
                return res.status(404).json({ error: 'L\'ID spécifié n\'est pas valide.' });
            };
            query = { employeeId };
            console.log("query "+query);
        };
        const employeeData = await checkInCheckOut.find(query);
        if(employeeData === null || employeeData === undefined){
            return res.status(500).json({error: 'Erreur lors de la récuperation des checks de l\'employé'});
        }
        res.json(employeeData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récuperation des données des employés dans la base, error : ' +error.message }); 
    }
};