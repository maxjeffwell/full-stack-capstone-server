const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    school: String,
    studentId: Number,
    teacher: String,
    dateOfBirth: Date,
    gender: String,
    race: String,
    gradeLevel: Number,
    nativeLanguage: String,
    cityOfBirth: String,
    countryOfBirth: String,
    ellStatus: String,
    compositeLevel: String,
    active: Boolean,
    designation: String
});

module.exports = mongoose.model('student', studentSchema);


