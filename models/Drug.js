const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DrugSchema = new Schema({
  drugName: {
    type: String,
    required: [true, 'Drug name is required'],
    lowercase: true,
  },
  applNo: {
    type: Number,
    required: true,
  },
  productNo: {
    type: Number,
    required: true,
  },
  form: {
    type: String,
    required: [true, 'Form is required'],
    lowercase: true,
  },
  strength: {
    type: String,
    required: [true, 'Strength is required'],
    lowercase: true,
  },
  activeIngredient: {
    type: String,
    required: [true, 'Active Ingredient is required'],
    lowercase: true,
  },
  marketingStatus: {
    type: String,
    enum: ['Prescription', 'Over-the-counter', 'Discontinued', 'None (Tentative Approval)'],
  },
  sponsorName: {
    type: String,
    lowercase: true,
  },
  tags: [
    {
      type: String,
      lowercase: true,
    }
  ],
},
{ runSettersOnQuery: true });

const DrugModel = mongoose.model('drug', DrugSchema);

module.exports = DrugModel;