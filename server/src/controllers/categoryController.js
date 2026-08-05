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
    // const { id } = req.params;
    const category = await Category.find();

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({ success: true, category });
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

// 1. Information Technology
// 2. Finance & Accounting
// 3. Healthcare & Medical
// 4. Marketing & Sales
// 5. Human Resources
// 6. Engineering & Construction
// 7. Design & Creative
// 8. Business & Management
// 9. Education & Training
// 10. Legal & Compliance
// 11. Customer Service
// 12. Retail & E-commerce
// 13. Logistics & Supply Chain
// 14. Hospitality & Tourism
// 15. Media & Communications
