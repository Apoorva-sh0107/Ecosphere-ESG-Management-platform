const express = require('express');
const router = express.Router();
const {
  getGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal
} = require('../controllers/environmentalController');

router.get('/goals', getGoals);
router.get('/goals/:id', getGoalById);
router.post('/goals', createGoal);
router.put('/goals/:id', updateGoal);
router.delete('/goals/:id', deleteGoal);

module.exports = router;
