let mongoose = require('mongoose');

let medlistsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    strikedprice: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    
}, {
    timestamps: true 
});

module.exports = mongoose.model('Medlist', medlistsSchema);
