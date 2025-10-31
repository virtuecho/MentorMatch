# MentorMatch – Frontend (Main Branch)
> **Branches**
> - `main` – primary development & local deployment (this README)
> - `deploy` – production/online deployment (separate README)

## 1) Project Overview

MentorMatch connects mentees with mentors for in-person knowledge sharing.  
This repository contains the **frontend**  that handles UI, routing, and API communication with the backend.



## 2) Tech Stack

- **Framework:** Vue + Vite
- **Routing:** Vue Router
- **Styling:** Vue SFC (scoped CSS)
- **Tooling:** Node.js, npm
- **Config:** `.env` with `VITE_` prefixed variables (e.g., `VITE_API_BASE_URL`)


## 3) Folder Structure

```text
networking_companion_frontend/
│
├── .vscode/                             # VS Code workspace settings
│
├── public/                              # Static public assets
│
├── src/
│   ├── assets/                          # Images, global styles, icons
│   │   ├── icons/                       # SVG/PNG icons
│   │   ├── base.css
│   │   ├── logo.svg
│   │   └── main.css
│   │
│   ├── components/                      # Reusable UI components (page sections)
│   │   ├── icons/
│   │   ├── BookingModal.vue
│   │   ├── CreateMeetingModal.vue
│   │   ├── HeaderComponent.vue
│   │   ├── HomepageContent.vue
│   │   ├── LoginViewContent.vue
│   │   ├── MenteeDashboardContent.vue
│   │   ├── MentorPersonalProfileContent.vue
│   │   ├── MentorVerificationContent.vue
│   │   ├── MentorsBookingsContent.vue
│   │   ├── MyBookingsContent.vue
│   │   ├── ProfileContent.vue
│   │   ├── SettingsContent.vue
│   │   └── SignUpViewContent.vue
│   │
│   ├── router/                          # Vue Router
│   │   └── index.js
│   │
│   ├── services/                        # API service layer
│   │   ├── api.js                       # HTTP base & interceptors
│   │   ├── auth.js                      # Auth (login/signup/token)
│   │   ├── availability.js              # Mentor availability APIs
│   │   ├── booking.js                   # Booking APIs
│   │   ├── mentor.js                    # Mentor profile/verification APIs
│   │   └── role.js                      # Role toggling / role APIs
│   │
│   ├── views/                           # Page-level views (routed pages)
│   │   ├── HomepageView.vue
│   │   ├── LoginView.vue
│   │   ├── MenteeDashboard.vue
│   │   ├── MentorPersonalProfileView.vue
│   │   ├── MentorVerificationView.vue
│   │   ├── MentorsBookingsView.vue
│   │   ├── MyBookingsView.vue
│   │   ├── ProfileView.vue
│   │   └── SettingsView.vue
│   │   └── SignUpView.vue
│   │
│   ├── App.vue                          # Root component
│   └── main.js                          # App entry
│
├── .env                                 # Local env vars (not committed)
├── .gitignore
├── index.html
├── jsconfig.json
├── package.json
├── package-lock.json
├── vite.config.js
├── testing/                             # (present if used for local tests)
├── schema_updated.prisma                # (deprecated scaffold; safe to ignore)
├── LICENSE_CLIENT.md
├── LICENSE_THIRD_PARTY.md
└── README.md
```


## 4) Setup instructions

```sh
npm install
```

## 5) Local deployment/testing steps
### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Mobile device local testing

```sh
npm run dev -- --host --port 3000
```

### Test URL

```sh
http://localhost:3000/
```
