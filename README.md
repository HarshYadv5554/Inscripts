# React Spreadsheet Application

A pixel-perfect React implementation of a spreadsheet interface with Excel/Google Sheets-like functionality.

## 🚀 Live Demo

[View Live Application](https://inscriptss.netlify.app/)

## 📋 Features

### Core Functionality

- **Pixel-perfect Figma implementation** - Matches the design specification exactly
- **Interactive spreadsheet experience** - Full Excel/Google Sheets-like functionality
- **Real-time search** - Search across all table data instantly
- **Advanced sorting** - Multi-level sorting with visual indicators
- **Dynamic filtering** - Filter by status and other criteria
- **Column management** - Hide/show columns dynamically
- **Data manipulation** - Add new rows, edit existing data
- **File operations** - Import/export CSV functionality
- **Sharing capabilities** - Professional sharing modal

### Enhanced Features

- **Keyboard navigation** - Arrow key navigation within the grid (Press any cell to activate)
- **Column resizing** - Drag column borders to resize (Hover over column headers)
- **Responsive design** - Works perfectly on all screen sizes
- **Professional UI** - Modal dialogs, hover states, loading indicators
- **Type safety** - Full TypeScript implementation with strict mode

## 🛠 Tech Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Strict mode for enhanced type safety
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Table Component** - Built from scratch for maximum control
- **Local State Management** - React hooks for state management

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd react-spreadsheet-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Check Prettier formatting
- `npm run format:fix` - Fix Prettier formatting
- `npm run type-check` - Run TypeScript type checking

## 🎯 Assignment Requirements Compliance

### ✅ Core Criteria Met

- [x] **Pixel-perfect Figma match** - UI matches the design specification exactly
- [x] **Spreadsheet experience** - Full Excel/Google Sheets-like functionality
- [x] **All interactive elements** - No dead UI, all buttons functional
- [x] **Clean code** - Passes `npm run lint` and `npm run type-check`
- [x] **TypeScript strict mode** - Full type safety implementation

### ✅ Tech Stack Requirements

- [x] **React 18** - Latest React with modern patterns
- [x] **TypeScript strict mode** - Enhanced type checking
- [x] **Tailwind CSS** - Utility-first styling approach
- [x] **Custom table component** - Built specifically for this use case
- [x] **Local state management** - React hooks for state

### ✅ Stretch Goals Implemented

- [x] **Keyboard navigation** - Arrow keys navigate the grid
- [x] **Column resize** - Drag to resize columns
- [x] **Column hide toggles** - Show/hide columns functionality

## 🏗 Architecture & Design Decisions

### Component Structure

```
client/
├── components/spreadsheet/
│   ├── Header.tsx          # Top navigation bar
│   ├── Toolbar.tsx         # Action buttons and controls
│   ├── Table.tsx           # Main spreadsheet component
│   ├── ViewTabs.tsx        # Bottom navigation tabs
│   ├── StatusBadge.tsx     # Status indicators
│   ├── Modals.tsx          # Basic modal components
│   └── ActionModals.tsx    # Advanced action modals
├── hooks/
│   ├── use-spreadsheet-filters.ts  # Search, sort, filter logic
│   ├── use-keyboard-navigation.ts  # Arrow key navigation
│   └── use-column-resize.ts        # Column resizing logic
├── lib/
│   ├── spreadsheet-types.ts        # TypeScript interfaces
│   ├── spreadsheet-data.ts         # Mock data
│   └── utils.ts                    # Utility functions
└── pages/
    └── Index.tsx           # Main application page
```

### Key Design Decisions

1. **Custom Table Component**: Built from scratch instead of using react-table for maximum control over styling and behavior

2. **Modular Hook Architecture**: Separated concerns into focused hooks for maintainability

3. **Type-First Development**: Comprehensive TypeScript interfaces for all data structures

4. **CSS-in-JS Alternative**: Used Tailwind CSS for consistent styling and easy maintenance

5. **Component Composition**: Broke down complex UI into smaller, reusable components

## 🎨 UI/UX Features

### Interactive Elements

- **Hover states** on all clickable elements
- **Focus management** for keyboard navigation
- **Loading states** for async operations
- **Success/error feedback** for user actions
- **Responsive design** for all screen sizes

### Accessibility

- **Keyboard navigation** support
- **Focus indicators** for screen readers
- **Semantic HTML** structure
- **ARIA labels** where appropriate

## 📊 Data Management

### State Architecture

- **Local component state** using React hooks
- **Derived state** for computed values (filtered/sorted data)
- **Memoization** for performance optimization
- **Event-driven updates** for real-time UI updates

### Data Flow

1. **Raw data** → Mock data imported from data file
2. **Filtering** → Search query and status filters applied
3. **Sorting** → Single or multi-column sorting
4. **Display** → Rendered in the table component
5. **Interactions** → User actions update state and re-render

## 🚧 Trade-offs & Limitations

### Performance Considerations

- **Virtual scrolling** not implemented (would be needed for 10,000+ rows)
- **Debounced search** could improve performance with large datasets
- **Memoization** could be enhanced for complex calculations

### Browser Compatibility

- **Modern browsers** (Chrome 90+, Firefox 88+, Safari 14+)
- **ES2020+ features** used throughout the codebase
- **CSS Grid/Flexbox** for layout (IE11 not supported)

### Future Enhancements

- **Real backend integration** for data persistence
- **Collaborative editing** with WebSockets
- **Advanced formulas** like Excel functions
- **Chart integration** for data visualization
- **Mobile-first responsive design** optimizations

## 🧪 Testing

### Code Quality

- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type checking
- **Strict mode** enabled for enhanced error detection

### Manual Testing

- **Cross-browser testing** on modern browsers
- **Responsive testing** on various screen sizes
- **Keyboard navigation testing** for accessibility
- **User interaction testing** for all features

## 📝 Development Notes

### Performance Optimizations

- **React.memo** for expensive components
- **useMemo/useCallback** for expensive calculations
- **Event delegation** for table interactions
- **Efficient re-renders** through proper state structure

### Code Standards

- **Consistent naming** conventions throughout
- **Clean component APIs** with clear prop interfaces
- **Separation of concerns** between UI and logic
- **Error boundaries** for graceful error handling

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the React Intern Assignment**
