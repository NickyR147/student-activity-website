const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    loginName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    department: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    }
});

userSchema.methods.getResetPassword = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

// Method to search for users based on provided criteria
userSchema.statics.searchUsers = async function (searchCriteria) {
    const query = {};

    if (searchCriteria.department) {
        query.department = searchCriteria.department;
    }
    if (searchCriteria.firstName) {
        query.firstName = new RegExp(searchCriteria.firstName, 'i');
    }
    if (searchCriteria.lastName) {
        query.lastName = new RegExp(searchCriteria.lastName, 'i');
    }

    return this.find(query).select('firstName lastName department phoneNumber email');
};

module.exports = mongoose.model('User', userSchema);
