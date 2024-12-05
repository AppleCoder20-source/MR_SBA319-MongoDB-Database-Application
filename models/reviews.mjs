import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  review: {
    type: Array,
    required: true,
  },
});
ReviewSchema.index({name: 1}, { unique: true });

const Review = mongoose.model('Review', ReviewSchema);

export default Review;
