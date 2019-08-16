
const Documents = require('../models/documents.model');
const DocumentsController = require('../controllers/documents.controller')(Documents);

module.exports = function (app) {
    app.get('/document/:id', DocumentsController.Get);
    app.get('/documents', DocumentsController.GetAll);
    app.post('/document', DocumentsController.InsertOrUpdate);
    app.delete('/document/:id', DocumentsController.Delete);

};
