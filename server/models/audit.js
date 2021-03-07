const mongoose = require('mongoose');

const AuditSchema = new mongoose.Schema({
    user: { type: String, required: true },
    loginTime: { type: String },
    logoutTime: { type: String },
    ip: { type: String }
});

mongoose.model('Audit', AuditSchema);
