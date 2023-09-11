const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server');
const Employee = require('../models/employee.model');
const CheckInCheckOut = require('../models/checkInCheckOut.model');
let timeoutMocha = require('../config/constant.config').mocha.timeout;

chai.use(chaiHttp);
const expect = chai.expect;

let mongoServer;

// Before  the test, start an factice MongoDB server
before(async function() {
    this.timeout(timeoutMocha); 
    await new Promise(resolve => app.once('serverReady', resolve));
    mongoServer = new MongoMemoryServer();
    //create a factice bases
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
   //Disconnect to the real base before connecting to the factice base
    await mongoose.disconnect();
   // Connect to factice database
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

// After running the tests, stop the in-memory MongoDB server
after(async function() {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Test name
describe('checkIn function', () => {
  // if successful check-in
  it('should successfully check-in an employee', async () => {
    // Create a fake employee
    const employee = new Employee({
      name: 'Rakoto',
      firstName: 'Jean',
      dateCreated: new Date(),
      department: 'IT',
    });
    await employee.save();

    // call the /check-in endpoints
    const response = await chai
      .request(app)
      .post('/check-in')
      .send({ employeeId: employee._id });

    // check status
    expect(response).to.have.status(200);
    // check the response 
    expect(response.body).to.have.property('message', 'Check-in enregistré avec succès.');

    // check if a new check-in  was created in the in-memory database
    const checkIn = await CheckInCheckOut.findOne({ employeeId: employee._id });
    expect(checkIn).to.exist;
    expect(checkIn.employeeId.toString()).to.equal(employee._id.toString());
  });

  // test if invalid employeeId
  it('should return an error for an invalid employeeId', async () => {
    const response = await chai
      .request(app)
      .post('/check-in')
      .send({ employeeId: 'randomID' });

    expect(response).to.have.status(404);
    // check the response 
    expect(response.body).to.have.property('error', 'L\'ID spécifié n\'est pas valide.');
  });
});
