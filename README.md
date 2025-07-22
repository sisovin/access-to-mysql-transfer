# MS-Access to MySQL Transfer Migration Tool

## Overview

A modern, elegant web application for migrating Microsoft Access databases to MySQL. Designed for database professionals and business users, this tool provides a sleek, intuitive interface to browse Access databases, preview tables and queries, and manage the migration process with real-time feedback.

---

## ✨ Features

- **🎨 Beautiful Design System**  
  Modern gradients, subtle shadows, semantic color tokens, and a cohesive blue-green color scheme.
- **📊 5-Step Migration Wizard**  
  Step-by-step process:  
  1. Database selection  
  2. MySQL configuration  
  3. Preview  
  4. Transfer  
  5. Completion summary
- **🔍 Database Preview**  
  Browse tables, queries, and procedures; see record counts; select specific items for migration.
- **⚡️ Real-time Progress**  
  Animated progress tracking with individual item status updates.
- **✅ Smart Validation**  
  Connection testing, form validation, and error handling.
- **📱 Responsive Design**  
  Adapts seamlessly to all screen sizes for desktop and mobile.

---

## Key Features

- File browser simulation for Access database selection
- MySQL connection configuration with connection testing
- Tabbed preview of all database objects for selective copying
- Real-time animated progress during transfer
- Success/failure handling and toast notifications
- Migration summary on completion

---

## File Structure

- `src/index.css` — Global styles for the application.
- `tailwind.config.ts` — Tailwind CSS configuration for color schemes and design tokens.
- `src/components/DatabaseSelector.tsx` — UI for selecting Access database files.
- `src/components/DatabasePreview.tsx` — Preview tables, queries, and procedures before migration.
- `src/components/TransferProgress.tsx` — Animated progress bar, tracking each item’s migration status.
- `src/components/MySQLConfiguration.tsx` — MySQL connection form with live testing and validation.
- `src/pages/Index.tsx` — Main page implementing the 5-step migration wizard.
- `src/App.css` — Custom styles for transitions, shadows, and layout.

---

## Getting Started

### Prerequisites

- Node.js & npm (recommended: install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```sh
git clone https://github.com/sisovin/access-to-mysql-transfer.git
cd access-to-mysql-transfer
npm install
npm run dev
```

---

## Usage

1. **Database Selection:**  
   Use the file browser to locate and select an Access `.mdb` or `.accdb` file.
2. **MySQL Configuration:**  
   Enter MySQL connection details. Test the connection before proceeding.
3. **Preview:**  
   Browse all tables, queries, procedures. Select which objects to migrate.
4. **Transfer:**  
   Follow live progress updates as each item transfers to MySQL.  
   Receive notifications for errors or completion.
5. **Complete:**  
   View a full migration summary, including stats and logs.

---

## Design & Customization

- **Modern UI/UX:**  
  Refined gradients, transitions, and subtle animated feedback.
- **Easy Customization:**  
  Tweak design tokens, colors, and layout in `tailwind.config.ts` and CSS files.
- **Iterative Editing:**  
  Use “chat mode” to plan, prompt, or iterate on features before editing code.

---

## Advanced Integration

- **GitHub Sync:**  
  Two-way sync with GitHub for code management.
- **Supabase Integration:**  
  Add user authentication, save migration history, or connect with other services using [Supabase](https://supabase.com/).

---

## Deployment

- Deploy instantly via [Lovable](https://lovable.dev/projects/3fc76292-b938-481d-bdcb-03111186b66e):  
  Click Share → Publish for live hosting.
- Custom domain support:  
  Go to Project → Settings → Domains → Connect Domain.  
  [Read more](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

---

## Technologies

- **Vite** — Lightning-fast development server
- **React** — Component-based UI
- **TypeScript** — Typed JavaScript for safer code
- **Tailwind CSS** — Utility-first styling
- **shadcn-ui** — Quality UI primitives

---

## Contributing

Contributions are welcome!  
Fork the repo, make changes, and submit a pull request.

---

## License

This project is licensed under the MIT License.

---

## Links

- [Lovable Project Dashboard](https://lovable.dev/projects/3fc76292-b938-481d-bdcb-03111186b66e)
- [Custom Domain Setup Guide](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

---

**Design a professional database migration experience—fast, beautiful, and reliable!**

---
