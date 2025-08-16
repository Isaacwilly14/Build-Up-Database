# Build_UP_ERP Frontend

A professional React + Bootstrap frontend for the Build_UP_ERP Supply Chain Management system.

## ✨ Features

- Modular, scalable architecture for supply chain management
- React 18, Vite, Bootstrap 5, and React-Bootstrap
- Role-based access, dynamic forms and tables for all major entities
- Easy integration with a RESTful backend (e.g., json-server)
- Responsive, modern UI

---

## 🚀 Getting Started

### 1. **Install dependencies**

```bash
npm install
```

### 2. **Start development server**

```bash
npm run dev
```

- Open [http://localhost:5173](http://localhost:5173) in your browser.
- The app will hot-reload on changes.

---

## 🗂️ Project Structure

```plaintext
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
│   ├── AuthContext.jsx
│   ├── DataContext.jsx  // For global state/data fetching
├── services/
│   ├── api.jsx         // API calls for CRUD operations
│   └── auth.jsx         // Authentication logic
├── utils/
│   ├── validators.jsx
│   ├── helpers.jsx
├── App.jsx
├── main.jsx
└── styles/
    ├── bootstrap.min.css
    └── custom.css
```

**Key Structure Highlights:**

- `components/`: Shared UI elements, tables, forms, and layout.
- `context/`: React Context for authentication and global data.
- `pages/`: Individual pages for each business domain/table.
- `services/`: API connectors for backend data fetching (REST).
- `utils/`: Utility functions, validators, helpers.
- `styles/`: Custom styles and Bootstrap overrides.

---

## ⚡ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Bootstrap 5](https://getbootstrap.com/)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [React Router](https://reactrouter.com/)

---

## 🔗 Backend Integration

This frontend is designed to work with a RESTful backend (e.g.,  json-server or custom API).  
See `src/services/api.js` for endpoints and data structure.

---

## 📄 License

MIT

---

## 🛠️ Contribution

Pull requests and suggestions are welcome!  
See the issues section for feature requests and bugs.
