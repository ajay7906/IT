const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const headerRoutes = require('./src/shared/navbar.router');
const footerRoutes = require('./src/shared/footer.router');
const slideRoutes = require('./src/component/home/heroSlider.routers');
const featureRoutes = require('./src/component/home/featuresSection.routers');
const businessSectionRoutes = require('./src/component/home/businessSection.routes');
const tabRoutes = require('./src/component/home/tabSection.routes');
const aboutUsRoutes = require('./src/component/about/aboutUsRoutes');
const bannerRoutes = require('./src/component/about/bannerRoutes');
const productRoutes = require('./src/component/product/productRoutes');
const carearRoutes = require('./src/component/carear/careerRoutes');
const blogRoutes = require('./src/component/blog/blogRoutes');
const contactRoutes = require('./src/component/contacts/contactRoutes');
const applicationRoutes = require('./src/component/services/allRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(cors());

app.use(express.json());

// Routes
app.use('/api/headers', headerRoutes);
app.use('/api/footers', footerRoutes);
app.use('/api/heroSlider', slideRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/businessSection', businessSectionRoutes);
app.use('/api/tabs', tabRoutes);
app.use('/api/about-us', aboutUsRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carears', carearRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/application', applicationRoutes);
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Database connection error:', err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
