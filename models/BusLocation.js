import mongoose from "mongoose";

const {Schema} = mongoose;

const busLocationSchema = new Schema({
    registration_no: String,
    longitude: Number,
    lattitude: Number,
    address: String,
    speed: Number,
    time: String
},{ collection: 'BusLocation' });


export default mongoose.models.BusLocation || mongoose.model("BusLocation", busLocationSchema);