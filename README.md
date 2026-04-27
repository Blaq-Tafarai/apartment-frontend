# Apartment Management System

A modern, feature-rich apartment management application built with React, Tailwind CSS, and CSS variables for complete theming support.

## Features

### Core Functionality
- 🏢 **Dashboard** - Overview of apartments, tenants, revenue, and maintenance
- 🏠 **Apartment Management** - Add, view, and manage apartment listings
- 👥 **Tenant Management** - Track tenant information and status
- 🔧 **Maintenance Tracking** - Monitor and manage maintenance requests
- 💰 **Billing & Invoices** - Handle payments and generate invoices
- ⚙️ **Settings** - Comprehensive theme customization

### Theme Customization
The app includes a powerful theme customizer with the following options:

#### 1. Theme Toggle (Light/Dark)
- Light Mode - Bright and clean interface
- Dark Mode - Easy on the eyes

#### 2. Color Customizer
Choose from 7 color themes:
- Blue (default)
- Yellow
- Red
- Green
- Purple
- Pink
- Indigo

#### 3. Font Customizer
Select from 5 professional fonts:
- Inter (default)
- Lato
- Roboto
- Playfair Display
- Space Mono

#### 4. Layout Customizer
Three card layout styles:
- Shadow - Cards with shadow effects
- Bordered - Cards with visible borders
- Skin - Cards with gradient backgrounds

#### 5. Sidebar Customizer
Two sidebar orientations:
- Vertical - Traditional left sidebar (default)
- Horizontal - Top navigation bar

## Technology Stack

- **Frontend Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + CSS Variables
- **Icons**: Lucide React
- **Charts**: Recharts
- **Build Tool**: Vite
- **State Management**: Context API + Local Storage

## Project Structure

```
apartment-management-app/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, fonts
│   ├── components/        # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   └── Table.jsx
│   ├── context/           # Global state management
│   │   ├── ThemeContext.js
│   │   └── AuthContext.js
│   ├── hooks/             # Custom React hooks
│   │   ├── useDebounce.js
│   │   └── useFetch.js
│   ├── layouts/           # Layout components
│   │   └── MainLayout/
│   │       ├── Header.jsx
│   │       ├── Sidebar.jsx
│   │       └── Footer.jsx
│   ├── features/          # Feature-based modules
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── apartment/
│   │   ├── tenants/
│   │   ├── maintenance/
│   │   ├── billing/
│   │   └── settings/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd apartment-management-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

## Usage

### Authentication
- The app includes a demo authentication system
- Use any email and password to login
- Authentication state persists in localStorage

### Theme Customization
1. Navigate to **Settings** from the sidebar
2. Use the tabs to customize different aspects:
   - **Theme**: Toggle between light and dark mode
   - **Color**: Choose your primary color scheme
   - **Font**: Select your preferred font family
   - **Layout**: Pick a card style
   - **Sidebar**: Choose sidebar orientation

### Managing Apartments
1. Go to **Apartments** section
2. Click "Add Apartment" to create new listings
3. Use the search bar to filter apartments
4. View apartment status and details

### Managing Tenants
1. Navigate to **Tenants** section
2. Add new tenants with their contact information
3. Search and filter tenant records
4. Track tenant status

### Tracking Maintenance
1. Access **Maintenance** section
2. View all maintenance requests
3. Track priority and status
4. Filter by various criteria

### Billing & Invoices
1. Open **Billing** section
2. View all invoices and their status
3. Track payments (Paid, Pending, Overdue)
4. Download invoices

## Customization

### Adding New Colors
Edit `src/index.css` and add new color definitions:

```css
[data-color="custom"] {
  --primary: R G B;
  --primary-dark: R G B;
  --accent: R G B;
}
```

### Adding New Fonts
1. Import font in `src/index.css`
2. Add font option in `ThemeCustomizer.jsx`
3. Add font definition in CSS:

```css
[data-font="custom"] {
  --font-family: 'Your Font', sans-serif;
}
```

### Adding New Layout Styles
Define new layout styles in `src/index.css`:

```css
[data-layout="custom"] .card {
  /* Your custom styles */
}
```

## Key Features Explained

### CSS Variables
The entire theming system is built on CSS variables, making it:
- Fast to switch themes (no page reload)
- Easy to customize
- Maintainable and scalable
- Persistent across sessions (localStorage)

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Responsive tables and cards
- Touch-friendly UI elements

### Accessibility
- Semantic HTML
- Keyboard navigation
- ARIA labels
- Focus states
- Color contrast compliance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Roadmap

- [ ] Add tenant document management
- [ ] Implement lease agreement tracking
- [ ] Add payment gateway integration
- [ ] Create mobile app version
- [ ] Add reporting and analytics
- [ ] Implement email notifications
- [ ] Add multi-property support

