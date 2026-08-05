import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
