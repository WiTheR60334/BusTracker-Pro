import mongoose from "mongoose";

const {Schema} = mongoose;

const busDetailsSchema = new Schema({
    bus_no: String,
    registration_no: String,
    model: String,
    color: String,
    seats: Number,
    longitude: Number,
    latitude: Number,
    speed: Number,
    time: String
},{ collection: 'BusDetails' });


export default mongoose.models.BusDetails || mongoose.model("BusDetails", busDetailsSchema);