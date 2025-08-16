

Frontend Project Structure

src/
├── components/
│   ├── tables/
│   │   ├── VarietiesTable.jsx
│   │   ├── CropsTable.jsx
│   │   ├── GreenhousesTable.jsx
│   │   ├── ForecastTable.jsx
│   │   ├── TasksTable.jsx
│   │   ├── StickingTable.jsx
│   │   ├── TransplantingTable.jsx
│   │   ├── MissingATTable.jsx
│   │   ├── StickingPlanTable.jsx
│   │   ├── LossesTable.jsx
│   │   ├── UsersTable.jsx
│   │   ├── SeasonsTable.jsx
│   │   ├── LayoutTable.jsx
│   │   ├── BedLabelsTable.jsx
│   │   ├── MappingTable.jsx
│   │   └── GrouppingTable.jsx
│   ├── forms/
│   │   ├── VarietyForm.jsx
│   │   ├── CropForm.jsx
│   │   ├── GreenhouseForm.jsx
│   │   ├── ForecastForm.jsx
│   │   ├── TaskForm.jsx
│   │   ├── ... (forms for each table)
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── Footer.jsx
│   ├── shared/
│   │   ├── Table.jsx        // Generic Table
│   │   ├── Modal.jsx
│   │   └── Dropdown.jsx
├── pages/
│   ├── Varieties.jsx
│   ├── Crops.jsx
│   ├── Greenhouses.jsx
│   ├── Forecast.jsx
│   ├── Tasks.jsx
│   ├── Sticking.jsx
│   ├── Transplanting.jsx
│   ├── MissingAT.jsx
│   ├── StickingPlan.jsx
│   ├── Losses.jsx
│   ├── Users.jsx
│   ├── Seasons.jsx
│   ├── Layout.jsx
│   ├── BedLabels.jsx
│   ├── Mapping.jsx
│   ├── Groupping.jsx
│   └── Dashboard.jsx
├── context/
│   ├── AuthContext.js
│   ├── DataContext.js  // For global state/data fetching
├── services/
│   ├── api.js          // API calls for CRUD operations
│   └── auth.js         // Authentication logic
├── utils/
│   ├── validators.js
│   ├── helpers.js
├── App.jsx
├── index.js
└── styles/
    ├── bootstrap.min.css
    └── custom.css
