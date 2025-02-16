const { Schema, model } = require("mongoose");

const rentsSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    spaces: {
      rooms: {
        type: Number,
        required: true,
      },
      bathrooms: {
        type: Number,
        required: true,
      },
    },
    description: {
      type: String,
      
    },
    images_URL: {
      type: [String],
      
    },
    pricePerNight: {
      type: Number,
      
    },
    rules: {
      type: [String],
      
    },
    amenities: {
      type: [String],
      required: false,
    },
    rent_type: {
      type: String,
      enum: ["Casa","Apartamento","Chalet","Dúplex","Estudio","Loft","Piso","Piso doble" ],
      default: "Casa",
    },
  },
  {
    timestamps: true,
  }
);

const Rents = model("Rents", rentsSchema);

module.exports = Rents;
