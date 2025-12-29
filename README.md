# KaushalLink 🎓

A modern platform to create, upload, and verify micro-credentials securely using blockchain technology.

## 📋 Overview

KaushalLink is a comprehensive credential management system that enables learners, institutions, employers, and administrators to manage micro-credentials efficiently. The platform leverages blockchain technology for secure verification and provides role-based dashboards for different user types.

## ✨ Features

### For Learners
- Upload and manage credentials
- View NSQF (National Skills Qualifications Framework) profile
- Track verification history
- Access credential stackability information
- Multi-language support

### For Institutions
- Issue and verify credentials
- Manage student records
- View audit logs
- Export credentials

### For Employers
- Verify candidate credentials
- View credential details
- Access verification history

### For Administrators
- System-wide management
- User management
- Audit log viewer
- Credential export functionality

## 🚀 Technologies

- **Frontend**: React 18.2, Vite
- **Routing**: React Router DOM 6.14
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React, React Icons
- **Blockchain**: Custom blockchain integration
- **Storage**: DigiLocker integration

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/mjr270/MICROCRIDENTIAL.git
cd KaushalLink
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm start` - Start development server (alias)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run build:css` - Build and minify Tailwind CSS

## 📁 Project Structure

```
KaushalLink/
├── src/
│   ├── components/     # Reusable components
│   ├── context/        # React context providers
│   ├── data/          # Static data files
│   ├── i18n/          # Internationalization
│   ├── pages/         # Page components
│   │   ├── Dshboards/ # Role-based dashboards
│   │   └── profiles/  # User profiles
│   ├── Style/         # CSS modules
│   └── utils/         # Utility functions
├── index.html         # Entry HTML
├── package.json       # Dependencies
└── vite.config.js     # Vite configuration
```

## 🔑 Key Components

### Authentication & Routing
- `AuthContext` - Authentication state management
- `ProtectedRoute` - Route protection
- `RoleDashboardRouter` - Role-based routing

### Dashboards
- `LearnerDashboard` - For students/learners
- `InstitutionDashboard` - For educational institutions
- `EmployerDashboard` - For employers
- `AdminDashboard` - For system administrators

### Credential Management
- `DocumentUpload` - Upload credentials
- `VerifyDocument` - Verify credentials
- `DocumentList` - View all documents
- `VerificationHistory` - Track verifications

### Special Features
- `NSQFProfile` - NSQF framework integration
- `StackabilityView` - Credential stackability
- `AuditLogViewer` - System audit logs
- `CredentialExporter` - Export credentials
- `Chatbot` - Interactive assistance

## 🌐 Multi-language Support

The application supports multiple languages through the `LanguageContext` provider. Translation files are available in `src/i18n/translations.js`.

## 🔐 Security Features

- Blockchain-based credential verification
- Role-based access control
- Protected routes
- Secure credential storage
- DigiLocker integration

## 🎨 Styling

The project uses Tailwind CSS for styling with custom configurations in:
- `tailwind.config.cjs` - Tailwind configuration
- `postcss.config.cjs` - PostCSS configuration
- `src/Style/` - Component-specific styles

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

KaushalLink Team

## 🌐 Website

[https://yourdomain.com](https://yourdomain.com)

## 📧 Contact

For questions or support, please contact the KaushalLink Team.

---

Made with ❤️ by the KaushalLink Team
