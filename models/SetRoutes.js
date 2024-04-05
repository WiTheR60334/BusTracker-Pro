import mongoose from "mongoose";

const {Schema} = mongoose;

const routesSchema = new Schema({
    route_id: Number,
    area1: String,
    area2: String,
    area3: String,
    area4: String,
    registration_no: String,
},{ collection: 'BusRoutes' });


export default mongoose.models.SetRoutes || mongoose.model("SetRoutes", routesSchema);