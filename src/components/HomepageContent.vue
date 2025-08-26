<template>
  <div class="homepage-content">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              Find the perfect mentor to help you achieve your goals
            </h1>
            <p class="hero-description">
              Connect with experienced professionals in your field and gain valuable insights to accelerate your career.
            </p>
          </div>
          <div class="hero-buttons">
            <button class="btn-primary">Sign Up</button>
            <button class="btn-secondary">Log In</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="process-section">
      <div class="process-container">
        <div class="process-header">
          <h2 class="process-title">Our simple process</h2>
          <p class="process-description">
            MentorMatch makes it easy to connect with experienced professionals and accelerate your career.
          </p>
        </div>
        
        <div class="process-steps">
          <!-- Step 1 -->
          <div class="process-step">
            <div class="step-icon">
              <img src="@/assets/icons/search-icon.svg" alt="Search" />
            </div>
            <div class="step-content">
              <h3 class="step-title">Find & Explore Mentors</h3>
              <p class="step-description">
                Browse our verified mentor directory using filters such as expertise, location, and availability to find the right match.
              </p>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="process-step">
            <div class="step-icon">
              <img src="@/assets/icons/calendar-icon.svg" alt="Calendar" />
            </div>
            <div class="step-content">
              <h3 class="step-title">Book a Session</h3>
              <p class="step-description">
                Select your preferred time slot and meeting mode (online or in-person), then confirm your booking in just a few clicks.
              </p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="process-step">
            <div class="step-icon">
              <img src="@/assets/icons/chat-icon.svg" alt="Chat" />
            </div>
            <div class="step-content">
              <h3 class="step-title">Start Learning</h3>
              <p class="step-description">
                Engage in meaningful conversations with your mentor, receive personalized guidance, and track your progress towards your goals.
              </p>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="process-step">
            <div class="step-icon">
              <img src="@/assets/icons/chat-icon.svg" alt="Growth" />
            </div>
            <div class="step-content">
              <h3 class="step-title">Grow & Improve</h3>
              <p class="step-description">
                Apply the insights and knowledge gained from your mentoring sessions to achieve your career goals and unlock new opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomepageContent'
}
</script>

<style scoped>
.homepage-content {
  width: 100%;
  min-height: calc(100vh - 80px);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px 0;
  color: white;
  width: 100%;
  min-height: 70vh;
  display: flex;
  align-items: center;
}

.hero-container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 160px;
}

.hero-content {
  width: 100%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 60px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0 auto;
}

.hero-title {
  font-size: 56px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 24px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  text-align: center;
}

.hero-description {
  font-size: 20px;
  line-height: 1.6;
  margin: 0 0 40px 0;
  opacity: 0.9;
  text-align: center;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 14px 32px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;
}

.btn-secondary:hover {
  background: white;
  color: #667eea;
}

/* Process Section */
.process-section {
  padding: 100px 0;
  background: #f9fafb;
  width: 100%;
}

.process-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 160px;
}

.process-header {
  text-align: center;
  margin-bottom: 80px;
}

.process-title {
  font-size: 42px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.process-description {
  font-size: 20px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
  max-width: 700px;
  margin: 0 auto;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1600px;
  margin: 0 auto;
}

.process-step {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 40px 30px;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 380px;
  box-sizing: border-box;
}

.process-step:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.step-icon {
  width: 64px;
  height: 64px;
  background: #f3f4f6;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px auto;
}

.step-icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.step-title {
  font-size: 22px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.3;
}

.step-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
}

.step-description {
  font-size: 15px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
  text-align: left;
  hyphens: auto;
  word-wrap: break-word;
  height: 200px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .hero-container,
  .process-container {
    padding: 0 80px;
  }
  
  .process-steps {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 40px;
  }
  
  .hero-content {
    padding: 40px 30px;
  }
  
  .hero-container,
  .process-container {
    padding: 0 20px;
  }
  
  .process-title {
    font-size: 32px;
  }
  
  .process-steps {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .step-title {
    font-size: 20px;
    white-space: normal;
    text-align: center;
    margin: 0 0 16px 0;
  }
  
  .step-description {
    font-size: 14px;
    text-align: center;
  }
  
  .process-step {
    height: 300px;
    padding: 30px 20px;
    box-sizing: border-box;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    max-width: 300px;
  }
  
  .process-section {
    padding: 60px 0;
  }
  
  .process-header {
    margin-bottom: 50px;
  }
}
</style>