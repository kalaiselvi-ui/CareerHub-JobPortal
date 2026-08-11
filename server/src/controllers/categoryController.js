import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "name field required" });
    }
    const category = await Category.create({
      name,
    });
    return res.status(201).json({ message: "New Category created", category });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.aggregate([
      {
        $lookup: {
          from: "jobs",
          localField: "_id",
          foreignField: "category",
          as: "jobs",
        },
      },
      {
        $project: {
          name: 1,
          slug: 1,
          jobCount: { $size: "$jobs" },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
