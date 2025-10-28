import { createRouter, createWebHistory } from 'vue-router'
import HomepageView from '../views/HomepageView.vue'
import SignUpView from '../views/SignUpView.vue'
import LoginView from '../views/LoginView.vue'
import MenteeDashboard from '../views/MenteeDashboard.vue'
import SettingsView from '../views/SettingsView.vue'
import ProfileView from '../views/ProfileView.vue'
import MyBookingsView from '../views/MyBookingsView.vue'
import MentorsBookingsView from '../views/MentorsBookingsView.vue'
import MentorVerificationView from '../views/MentorVerificationView.vue'

const MentorPersonalProfileView = () => import('../views/MentorPersonalProfileView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomepageView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: MenteeDashboard
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/my-bookings',
      name: 'my-bookings',
      component: MyBookingsView
    },
    {
      path: '/mentors-bookings',
      name: 'mentors-bookings',
      component: MentorsBookingsView
    },
    {
      path: '/mentor-profile/:id',
      name: 'mentor-personal-profile',
      component: MentorPersonalProfileView
    },
    {
      path: '/mentor-verification',
      name: 'mentor-verification',
      component: MentorVerificationView
    }
  ]
})

// Role-aware route constraints and redirections
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken')
  const role = localStorage.getItem('userRole') || 'mentee'

  // Public pages that don't require authentication
  const publicPages = new Set(['/', '/login', '/signup'])
  if (publicPages.has(to.path)) {
    return next()
  }

  // If not authenticated, redirect to login
  if (!token) {
    return next('/login')
  }

  // Redirect bookings between modes
  if (role === 'mentor' && to.path === '/my-bookings') {
    return next('/mentors-bookings')
  }
  if (role === 'mentee' && to.path === '/mentors-bookings') {
    return next('/my-bookings')
  }

  // Allowed pages per role
  const menteeAllowed = new Set(['/dashboard', '/my-bookings', '/settings', '/profile', '/mentor-verification'])
  const mentorAllowed = new Set(['/mentors-bookings', '/settings', '/profile', '/mentor-verification'])

  if (role === 'mentee') {
    // mentor personal profile page is also allowed for mentee
    if (to.path.startsWith('/mentor-profile/')) return next()
    if (menteeAllowed.has(to.path)) return next()
    // Default mentee landing
    return next('/dashboard')
  } else {
    // Mentor mode
    if (to.path.startsWith('/mentor-profile/')) return next()
    if (mentorAllowed.has(to.path)) return next()
    // If accidentally visits mentee-only pages, send to mentor bookings
    return next('/mentors-bookings')
  }
})

export default router