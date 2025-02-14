const { Schema, model } = require("mongoose")

const rentsSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        name: {
            type: String,
            //required: true
        },
        city: {
            type: String,
            //required: true
        },
        country: {
            type: String,
            //required: true
        },
        rooms: {
            type: Number,
            //required: true
        },
        bathrooms: {
            type: Number,
            //required: true
        },
        description: {
            type: String,
            //required: true
        },
        image_URL: {
            type: String,
            //required: true
        },
        pricePerNight: {
            type: Number,
            //required: true
        }
        
    },
    {
        timestamps: true
    }
)

const Rents = model("Rents", rentsSchema)

module.exports = Rents