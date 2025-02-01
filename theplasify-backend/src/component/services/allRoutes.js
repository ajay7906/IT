const express = require('express');
const router = express.Router();
const multer = require('multer');

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory for storing uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Add timestamp to avoid name conflicts
  },
});

const upload = multer({ storage });

// Import controllers
const {
  getApplicationServices,
  getApplicationServiceById,
  createApplicationService,
  updateApplicationService,
  deleteApplicationService,
} = require('./applicationServicesController');

const {
  getAllBusinessServices,
  getBusinessServiceById,
  createBusinessService,
  updateBusinessService,
  deleteBusinessService,
} = require('./businessServicesController');

const {
  getAllTechnologyTrainings,
  getTechnologyTrainingById,
  createTechnologyTraining,
  updateTechnologyTraining,
  deleteTechnologyTraining,
} = require('./technologyTrainingController.js');

const {
  getAllGlobalStaffing,
  getGlobalStaffingById,
  createGlobalStaffing,
  updateGlobalStaffing,
  deleteGlobalStaffing,
} = require('./GlobalStaffingController');

// Application Services Routes
router.get('/application/getAll', getApplicationServices);
router.get('/application/getById/:id', getApplicationServiceById);
router.post(
  '/application/add',
  upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'secondaryImage', maxCount: 1 },
    { name: 'tabImages', maxCount: 10 },
  ]),
  createApplicationService
);
router.put(
  '/application/update/:id',
  upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'secondaryImage', maxCount: 1 },
    { name: 'tabImages', maxCount: 10 },
  ]),
  updateApplicationService
);
router.delete('/application/delete/:id', deleteApplicationService);

// Business Services Routes
router.get('/business/getAll', getAllBusinessServices);
router.get('/business/getById/:id', getBusinessServiceById);
router.post(
  '/business/add',
  upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'contentImage', maxCount: 1 },
  ]),
  createBusinessService
);
router.put(
  '/business/update/:id',
  upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'contentImage', maxCount: 1 },
  ]),
  updateBusinessService
);
router.delete('/business/delete/:id', deleteBusinessService);

// Technology Training Routes
router.get('/technology/getAll', getAllTechnologyTrainings);
router.get('/technology/getById/:id', getTechnologyTrainingById);
router.post(
  '/technology/add',
  upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'contentImage', maxCount: 1 },
  ]),
  createTechnologyTraining
);
router.put(
  '/technology/update/:id',
  upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'contentImage', maxCount: 1 },
  ]),
  updateTechnologyTraining
);
router.delete('/technology/delete/:id', deleteTechnologyTraining);

// Global Staffing Routes
router.get('/globalStaffing/getAll', getAllGlobalStaffing);
router.get('/globalStaffing/getById/:id', getGlobalStaffingById);
router.post(
  '/globalStaffing/add',
  upload.fields([{ name: 'headerImage', maxCount: 1 }]),
  createGlobalStaffing
);
router.put(
  '/globalStaffing/update/:id',
  upload.fields([{ name: 'headerImage', maxCount: 1 }]),
  updateGlobalStaffing
);
router.delete('/globalStaffing/delete/:id', deleteGlobalStaffing);

module.exports = router;
