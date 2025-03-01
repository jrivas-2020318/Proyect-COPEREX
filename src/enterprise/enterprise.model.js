import {Schema, model} from 'mongoose'

const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    impactLevel: {
        type: String,
        required: [true, "Impact level is required"],
        enum: ['Low', 'Medium', 'High'],
        lowercase: true
    },
    yearsExperience: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Category is required"]
    },

})

export default model('Company', companySchema)
