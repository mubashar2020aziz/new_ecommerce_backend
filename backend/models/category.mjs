import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  categoryImage: { type: String },
  parentId: {
    type: String,
  },
});
const categoryUser = mongoose.model('Category', categorySchema);
export default categoryUser;
