import Category from '../models/Category.js';

class CategoryController {
  async getCategories(req, res) {
    /* #swagger.tags = ['Categories'] */
    try {
      const categories = await Category.find().populate('type');
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving categories',
        error: error.message,
      });
    }
  }

  async createCategory(req, res) {
    /* #swagger.tags = ['Categories'] */
    try {
      const category = await Category.create({
        name: req.body.name,
        type: req.body.type,
      });

      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({
        message: 'Error creating category',
        error: error.message,
      });
    }
  }

  async getCategoryById(req, res) {
    /* #swagger.tags = ['Categories'] */
    try {
      const category = await Category.findById(req.params.id).populate('type');
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving category',
        error: error.message,
      });
    }
  }

  async updateCategory(req, res) {
    /* #swagger.tags = ['Categories'] */
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true, runValidators: true }
      ).populate('type');

      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({
        message: 'Error updating category',
        error: error.message,
      });
    }
  }

  async deleteCategory(req, res) {
    /* #swagger.tags = ['Categories'] */
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting category',
        error: error.message,
      });
    }
  }
}

export default new CategoryController();
