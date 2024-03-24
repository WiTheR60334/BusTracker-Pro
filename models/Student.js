import mongoose from "mongoose";

const {Schema} = mongoose;

const studentSchema = new Schema({
    enrollment_no: String,
    name: String,
    surname: String,
    standard: String,
    section: String,
    father_name: String,
    mother_name: String,
    father_mobile: String,
    mother_mobile: String,
    picture: String,
    address: String,
    email: String,
    busNo: String,
    location: {
        longitude: String,
        latitude: String
    }
},{ collection: 'Student' });


export default mongoose.models.Student || mongoose.model("Student", studentSchema);