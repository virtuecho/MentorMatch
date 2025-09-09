<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo Section -->
      <div class="logo-section">
        <div class="logo-icon" @click="$router.push(logoRoute)" role="button" tabindex="0" @keydown.enter.prevent="$router.push(logoRoute)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_138_39)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 15.3338C10.5341 15.3338 9.10103 14.8991 7.88212 14.0847C6.66323 13.2703 5.71321 12.1127 5.15221 10.7583C4.59121 9.4039 4.44443 7.91358 4.73042 6.47581C5.01642 5.038 5.72234 3.7173 6.75894 2.68072C7.79552 1.64412 9.11622 0.938196 10.554 0.652201C11.9918 0.366206 13.4821 0.512991 14.8365 1.07399C16.1909 1.63499 17.3485 2.58501 18.1629 3.80393C18.9774 5.0228 19.4121 6.45586 19.4121 7.92181H12V15.3338Z" fill="#0D141C"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 15.3338C10.5341 15.3338 9.10103 14.8991 7.88212 14.0847C6.66323 13.2703 5.71321 12.1127 5.15221 10.7583C4.59121 9.4039 4.44443 7.91358 4.73042 6.47581C5.01642 5.038 5.72234 3.7173 6.75894 2.68072C7.79552 1.64412 9.11622 0.938196 10.554 0.652201C11.9918 0.366206 13.4821 0.512991 14.8365 1.07399C16.1909 1.63499 17.3485 2.58501 18.1629 3.80393C18.9774 5.0228 19.4121 6.45586 19.4121 7.92181H12V15.3338Z" stroke="black"/>
            </g>
            <defs>
              <filter id="filter0_d_138_39" x="0" y="0" width="23.9999" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_138_39"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_138_39" result="shape"/>
              </filter>
            </defs>
          </svg>
        </div>
        <div class="logo-text">
          <router-link :to="logoRoute" class="logo-link">
            <h1>MentorMatch</h1>
          </router-link>
        </div>
      </div>
      
      <!-- Center Search Section -->
      <div class="center-search" v-if="showSearchBar">
        <div class="search-container">
          <div class="search-input-wrapper">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke="#6B7280" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search" 
              v-model="searchQuery"
              class="search-input"
              @input="$emit('search', searchQuery)"
            />
          </div>
        </div>
      </div>
      
      <!-- Right Section -->
      <div class="right-section">
        <!-- Navigation Tabs -->
        <div class="nav-tabs" v-if="showTabs">
          <button 
            class="tab-button" 
            :class="{ active: $route.path === '/dashboard' }"
            @click="$emit('tab-change', 'sessions')"
            v-if="!isMentorMode"
          >
            My Sessions
          </button>
          <button 
            class="tab-button" 
            :class="{ active: $route.path === '/my-bookings' || $route.path === '/mentors-bookings' }"
            @click="goToMyBookings"
          >
            My Bookings
          </button>
        </div>
        
        <!-- Control Buttons -->
        <div class="control-buttons" v-if="showControlButtons">
          <!-- Settings Button -->
          <button class="control-btn settings-btn" @click="goToSettings">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16.167 12.5a1.375 1.375 0 0 0 .275 1.517l.05.05a1.667 1.667 0 1 1-2.359 2.358l-.05-.05a1.375 1.375 0 0 0-1.516-.275 1.375 1.375 0 0 0-.834 1.258v.142a1.667 1.667 0 0 1-3.333 0V17a1.375 1.375 0 0 0-.9-1.258 1.375 1.375 0 0 0-1.517.275l-.05.05a1.667 1.667 0 1 1-2.358-2.359l.05-.05A1.375 1.375 0 0 0 3.9 12.142 1.375 1.375 0 0 0 2.642 11.5H2.5a1.667 1.667 0 0 1 0-3.333H2.642A1.375 1.375 0 0 0 3.9 7.333a1.375 1.375 0 0 0-.275-1.516l-.05-.05a1.667 1.667 0 1 1 2.358-2.359l.05.05a1.375 1.375 0 0 0 1.517.275H7.5a1.375 1.375 0 0 0 1.258-.9V2.5a1.667 1.667 0 0 1 3.334 0v.142a1.375 1.375 0 0 0 .833 1.258 1.375 1.375 0 0 0 1.517-.275l.05-.05a1.667 1.667 0 1 1 2.358 2.358l-.05.05a1.375 1.375 0 0 0-.275 1.517v0a1.375 1.375 0 0 0 1.259.833H17.5a1.667 1.667 0 0 1 0 3.334h-.142a1.375 1.375 0 0 0-1.258.833v0Z" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <!-- Profile Button with Dropdown -->
          <div class="profile-dropdown" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
            <button class="control-btn profile-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            
            <!-- Dropdown Menu -->
            <div class="dropdown-menu" v-show="showDropdown">
              <div class="dropdown-item" @click="goToProfile">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 8a3.333 3.333 0 1 0 0-6.667A3.333 3.333 0 0 0 8 8Z" stroke="#374151" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13.727 14.667c0-2.58-2.567-4.667-5.727-4.667s-5.727 2.087-5.727 4.667" stroke="#374151" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Profile</span>
              </div>
              <div class="dropdown-item" @click="logout">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 14H3.333A1.333 1.333 0 0 1 2 12.667V3.333A1.333 1.333 0 0 1 3.333 2H6" stroke="#374151" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10.667 11.333 14 8l-3.333-3.333" stroke="#374151" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 8H6" stroke="#374151" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: {
    showTabs: {
      type: Boolean,
      default: false
    },
    activeTab: {
      type: String,
      default: 'sessions'
    }
  },
  data() {
    return {
      searchQuery: '',
      showDropdown: false,
      role: localStorage.getItem('userRole') || 'mentee'
    }
  },
  computed: {
    showSearchBar() {
      return this.$route.path === '/dashboard'
    },
    showControlButtons() {
      return this.$route.path === '/dashboard' || this.$route.path === '/settings' || this.$route.path === '/profile' || this.$route.path === '/my-bookings' || this.$route.path === '/mentors-bookings' || this.$route.path.startsWith('/mentor-profile')
    },
    logoRoute() {
      // 根据角色决定点击 Logo 去向：Mentor -> mentors-bookings；Mentee -> my-bookings；未登录 -> 首页
      const token = localStorage.getItem('authToken')
      if (!token) return '/'
      return this.role === 'mentor' ? '/mentors-bookings' : '/my-bookings'
    },
    isMentorMode() {
      return this.role === 'mentor'
    }
  },
  methods: {
    goToSettings() {
      this.$router.push('/settings')
    },
    goToMyBookings() {
      if (this.isMentorMode) {
        if (this.$route.path !== '/mentors-bookings') {
          this.$router.push('/mentors-bookings')
        }
      } else {
        if (this.$route.path !== '/my-bookings') {
          this.$router.push('/my-bookings')
        }
      }
    },
    goToProfile() {
      this.showDropdown = false
      this.$router.push('/profile')
    },
    logout() {
      this.showDropdown = false
      localStorage.removeItem('authToken')
      localStorage.removeItem('userRole')
      this.$router.push('/login')
    },
    onUserRoleChanged(e) {
      if (e && e.detail) {
        this.role = e.detail
      }
    }
  },
  mounted() {
    window.addEventListener('userRoleChanged', this.onUserRoleChanged)
  },
  beforeUnmount() {
    window.removeEventListener('userRoleChanged', this.onUserRoleChanged)
  },
  emits: ['search', 'tab-change']
}
</script>

<style scoped>
.header {
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 1px 0;
}

.header-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.logo-link {
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
}

.logo-link:hover {
  opacity: 0.8;
}

.logo-text h1 {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  white-space: nowrap;
  cursor: pointer;
}

/* Center Search Section */
.center-search {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;
}

.search-container {
  width: 100%;
  max-width: 300px;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 12px;
  transition: border-color 0.2s ease;
}

.search-input-wrapper:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-icon {
  margin-right: 8px;
  flex-shrink: 0;
}

.search-input {
  border: none;
  background: none;
  outline: none;
  font-size: 14px;
  color: #374151;
  width: 100%;
}

.search-input::placeholder {
  color: #6b7280;
}

/* Right Section */
.right-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Navigation Tabs */
.nav-tabs {
  display: flex;
  gap: 24px;
}

.tab-button {
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  padding: 8px 0;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.tab-button.active {
  color: #1f2937;
  border-bottom: 2px solid #1f2937;
}

.tab-button:hover {
  color: #374151;
}

/* Control Buttons */
.control-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-btn {
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  background: #f3f4f6;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .header-container {
    padding: 0 4%;
  }
  
  .center-search {
    max-width: 300px;
  }
  
  .nav-tabs {
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 4%;
  }
  
  .logo-text h1 {
    font-size: 20px;
  }
  
  .center-search {
    max-width: 250px;
  }
  
  .search-container {
    max-width: 200px;
  }
  
  .right-section {
    gap: 12px;
  }
  
  .nav-tabs {
    gap: 12px;
  }
  
  .tab-button {
    font-size: 13px;
    padding: 6px 16px;
    white-space: nowrap;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0 4%;
    flex-wrap: wrap;
    gap: 8px;
    align-items: flex-start;
  }
  
  .logo-section {
    flex: 1;
    min-width: 0;
  }
  
  .logo-icon {
    width: 24px;
    height: 24px;
  }
  
  .logo-text h1 {
    font-size: 18px;
  }
  
  .right-section {
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    min-width: fit-content;
  }
  
  .nav-tabs {
    gap: 8px;
    order: 2;
    display: flex;
    justify-content: flex-end;
  }
  
  .tab-button {
    font-size: 12px;
    padding: 6px 12px;
    white-space: nowrap;
    min-width: 80px;
    text-align: center;
  }
  
  .control-buttons {
    gap: 6px;
    order: 1;
    display: flex;
  }
  
  .control-btn {
    padding: 6px;
  }
  
  .center-search {
    order: 3;
    flex-basis: 100%;
    max-width: none;
    margin-top: 8px;
  }
  
  .search-container {
    max-width: none;
  }
}

@media (max-width: 360px) {
  .header-container {
    padding: 0 3%;
    gap: 6px;
  }
  
  .logo-text h1 {
    font-size: 16px;
  }
  
  .right-section {
    gap: 6px;
  }
  
  .nav-tabs {
    gap: 4px;
    flex-direction: column;
    align-items: flex-end;
  }
  
  .tab-button {
    font-size: 11px;
    padding: 4px 8px;
    min-width: 70px;
    width: auto;
  }
  
  .control-buttons {
    gap: 4px;
  }
  
  .control-btn {
    padding: 4px;
  }
  
  .control-btn svg {
    width: 18px;
    height: 18px;
  }
}

/* Profile Dropdown Styles */
.profile-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  min-width: 120px;
  z-index: 1000;
  margin-top: 4px;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;
  color: #374151;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.dropdown-item:not(:last-child) {
  border-bottom: 1px solid #f3f4f6;
}

.dropdown-item svg {
  flex-shrink: 0;
}

.dropdown-item span {
  font-weight: 500;
}
</style>