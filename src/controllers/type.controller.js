import Type from '../models/Type.js';
import { ALLOWED_TYPES } from '../helpers/constants.js';

class TypeController {
  async getTypes(req, res) {
    /* #swagger.tags = ['Types'] */
    try {
      const types = await Type.find();
      res.status(200).json(types);
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving types',
        error: error.message,
      });
    }
  }

  async createType(req, res) {
    /* #swagger.tags = ['Types'] */
    try {
      const type = await Type.create({
        name: req.body.name,
      });

      res.status(201).json(type);
    } catch (error) {
      res.status(500).json({
        message: 'Error creating type',
        error: error.message,
      });
    }
  }

  async getTypeById(req, res) {
    /* #swagger.tags = ['Types'] */
    try {
      const type = await Type.findById(req.params.id);

      if (!type) {
        return res.status(404).json({ message: 'Type not found' });
      }

      res.status(200).json(type);
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving type',
        error: error.message,
      });
    }
  }

  async updateType(req, res) {
    /* #swagger.tags = ['Types'] */
    try {
      const type = await Type.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true, runValidators: true }
      );

      if (ALLOWED_TYPES.includes(type.name)) {
        return res.status(400).json({ message: 'Type cannot be updated' });
      }

      res.status(200).json(type);
    } catch (error) {
      res.status(500).json({
        message: 'Error updating type',
        error: error.message,
      });
    }
  }

  async deleteType(req, res) {
    /* #swagger.tags = ['Types'] */
    try {
      const type = await Type.findById(req.params.id);

      if (ALLOWED_TYPES.includes(type.name)) {
        return res.status(403).json({ message: 'Type cannot be deleted' });
      }

      await Type.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Type deleted successfully' });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting type',
        error: error.message,
      });
    }
  }
}

export default new TypeController();
