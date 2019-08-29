const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DrugSchema = new Schema({
  DrugName: {
    type: String,
    required: [true, 'Drug name is required'],
    lowercase: true,
  },
  ApplNo: {
    type: Number,
    required: true,
  },
  ProductNo: {
    type: Number,
    required: true,
  },
  Form: {
    type: String,
    required: [true, 'Form is required'],
    lowercase: true,
  },
  Strength: {
    type: String,
    required: [true, 'Strength is required'],
    lowercase: true,
  },
  ActiveIngredient: {
    type: String,
    required: [true, 'Active Ingredient is required'],
    lowercase: true,
  },
  MarketingStatus: {
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