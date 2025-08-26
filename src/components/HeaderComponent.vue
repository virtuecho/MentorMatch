<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo Section -->
      <div class="logo-section">
        <div class="logo-icon">
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
        <div class="logo-text" @click="goToHomepage">
          <h1>MentorMatch</h1>
        </div>
      </div>
      
      <!-- Navigation Section -->
      <nav class="nav-section">
        <!-- Add navigation items here if needed -->
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  methods: {
    goToHomepage() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 0;
}

.header-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 120px;
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

.logo-text {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.logo-text:hover {
  opacity: 0.8;
}

.logo-text h1 {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  white-space: nowrap;
}

.nav-section {
  display: flex;
  align-items: center;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .header-container {
    padding: 0 60px;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 20px;
  }
  
  .logo-icon {
    width: 28px;
    height: 28px;
  }
  
  .logo-text h1 {
    font-size: 20px;
  }
}
</style>