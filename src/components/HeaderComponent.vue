<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo Section -->
      <div class="logo-section">
        <div class="logo-icon">
          <img src="@/assets/icons/logo-icon.svg" alt="Logo" />
        </div>
        <div class="logo-text">
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
  name: 'HeaderComponent'
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
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
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.logo-text h1 {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.nav-section {
  display: flex;
  align-items: center;
}
</style>