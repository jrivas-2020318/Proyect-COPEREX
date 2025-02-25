import {Shema, model} from 'mongoose'

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    impactLevel: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High']
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    businessCategory: {
        type: String,
        required: true
    },

})

export default model('Company', companySchema)
