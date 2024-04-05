import mongoose from "mongoose";

const {Schema} = mongoose;

const driverSchema = new Schema({
    driver_id: Number,
    driver_name: String,
    bus_no: String,
    mobile_no: Number,
    email: String
},{ collection: 'Driver' });


export default mongoose.models.Driver || mongoose.model("Driver", driverSchema);