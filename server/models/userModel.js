const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
      enum: [ "donar",  "hospital", "organization"],
    },

    // Name is required if donor 
    name: {
      type: String,
      required: function () {
        if (this.userType === "donar" || this.userType === "admin") {
          return true;
        }
        return false;
      },
    },

    // organisationName is required if organisation
    organisationName: {
      type: String,
      required: function () {
        if (this.userType === "organization") {
          return true;
        }
        return false;
      },
    },

    // hospitalName is required if hospital
    hospitalName: {
      type: String,
      required: function () {
        if (this.userType === "hospital") {
          return true;
        }
        return false;
      },
    },

    // website is required if organisation or hospital
    website: {
        type: String,
        required: function () {
          if (this.userType === "hospital" || this.userType === "organisation") {
            return true;
          }
          return false;
        },
      },

    // address is required if organisation or hospital
    address: {
        type: String,
        required:  function () {
        if (this.userType === "hospital") {
            return true;
        }
        return false;
        },
    },

    // Common for all
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is requied"],
    },

    phone: {
      type: String,
      required: [true, "address is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
