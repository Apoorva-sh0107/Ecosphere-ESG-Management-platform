const express = require('express');
const cors = require('cors');
require('dotenv').config();

const environmentalRoutes = require('./routes/environmental');
const departmentRoutes = require('./routes/departments');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Module routes
// Other modules (Social, Governance, Gamification, Reports, Settings) follow
// the exact same pattern: routes/<module>.js + controllers/<module>Controller.js
app.use('/api/environmental', environmentalRoutes);
app.use('/api/departments', departmentRoutes);

app.listen(PORT, () => {
  console.log(`EcoSphere backend running on http://localhost:${PORT}`);
});
