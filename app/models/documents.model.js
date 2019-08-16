const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Documents schema
const DocumentSchema = new Schema({
    doc_type: { type: String },
    is_blacklisted: { type: Boolean },
    doc_value: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date }
}, {collection: 'documents', strict: false, versionKey: false});

const DocumentModel = mongoose.model('Document', DocumentSchema);

module.exports = DocumentModel;
