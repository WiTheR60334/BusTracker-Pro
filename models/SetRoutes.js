import mongoose from "mongoose";
import { ST } from "next/dist/shared/lib/utils";

const {Schema} = mongoose;

const routesSchema = new Schema({
    route_id: Number,
    area1: String,
    area2: String,
    area3: String
},{ collection: 'BusRoutes' });


export default mongoose.models.SetRoutes || mongoose.model("SetRoutes", routesSchema);