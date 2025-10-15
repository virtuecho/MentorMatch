<template>
  <div class="signup-content">
    <div class="signup-container">
      <div class="signup-form-wrapper">
        <div class="signup-header">
          <h1 class="signup-title">Sign up to ConnectUp</h1>
        </div>
        
        <form class="signup-form" @submit.prevent="handleSignUp">
          <!-- Name Field -->
          <div class="form-group">
            <label class="form-label">Name</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Enter your name"
              v-model="formData.name"
              required
            />
          </div>
          
          <!-- Email Field -->
          <div class="form-group">
            <label class="form-label">Email</label>
            <input 
              type="email" 
              class="form-input" 
              placeholder="Enter your email"
              v-model="formData.email"
              required
            />
          </div>
          
          <!-- Password Field -->
          <div class="form-group">
            <label class="form-label">Password</label>
            <input 
              type="password" 
              class="form-input" 
              placeholder="Enter your password"
              v-model="formData.password"
              required
            />
          </div>
          
          <!-- Confirm Password Field -->
          <div class="form-group">
            <label class="form-label">Confirm Password</label>
            <input 
              type="password" 
              class="form-input" 
              placeholder="Confirm your password"
              v-model="formData.confirmPassword"
              required
            />
          </div>
          
          <!-- Terms Agreement -->
          <div class="form-group checkbox-group">
            <div class="checkbox-wrapper">
              <input 
                type="checkbox" 
                id="terms" 
                class="form-checkbox"
                v-model="formData.agreeToTerms"
                required
              />
              <label for="terms" class="checkbox-label">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>
          </div>
          
          <!-- Sign Up Button -->
          <div class="form-group">
            <button type="submit" class="signup-button">
              Sign Up
            </button>
          </div>
          
          <!-- Login Link -->
          <div class="form-group login-link">
            <p class="login-text">
              Already have an account? 
              <router-link to="/login" class="login-link-text">Log in</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '@/services/auth';

export default {
  name: 'SignUpViewContent',
  data() {
    return {
      formData: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
      }
    }
  },
  methods: {
    async handleSignUp() {
      // Validate passwords match
      if (this.formData.password !== this.formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      
      // Handle sign up logic here
      try {
        const res = await register(
          this.formData.name || undefined,
          this.formData.email,
          this.formData.password,
          undefined  // Role will be set to 'mentee' by backend default
        );
        console.log(res.data);
        alert('Sign up successful!');

        // Navigate to log in
        const redirect = this.$route.query.redirect || { name: 'login' };
        this.$router.replace(redirect);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Registration failed');
      }
    }
  }
}
</script>

<style scoped>
.signup-content {
  width: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 160px;
}

.signup-container {
  width: 100%;
  max-width: 960px;
  display: flex;
  justify-content: center;
}

.signup-form-wrapper {
  width: 100%;
  max-width: 480px;
  background: #F7FAFC;
  padding: 20px 0;
}

.signup-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px 16px 12px;
}

.signup-title {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 700;
  font-size: 28px;
  line-height: 1.25;
  color: #0D141C;
  margin: 0;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
  color: #0D141C;
  margin: 0;
}

.form-input {
  width: 100%;
  padding: 15px;
  border: 1px solid #CFDBE8;
  border-radius: 8px;
  background: #F7FAFC;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #0D141C;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.form-input::placeholder {
  color: #4D7399;
  font-weight: 400;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.checkbox-group {
  margin: 8px 0;
}

.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.form-checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid #CFDBE8;
  border-radius: 4px;
  margin: 0;
  flex-shrink: 0;
  margin-top: 2px;
}

.checkbox-label {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #0D141C;
  font-weight: 400;
  margin: 0;
  cursor: pointer;
}

.signup-button {
  width: 100%;
  padding: 16px;
  background: #3b82f6;
  color: #F7FAFC;
  border: none;
  border-radius: 8px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.signup-button:hover {
  background: #2563eb;
}

.login-link {
  text-align: center;
  margin-top: 8px;
}

.login-text {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #4D7399;
  margin: 0;
}

.login-link-text {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.login-link-text:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .signup-content {
    padding: 20px 80px;
  }
}

@media (max-width: 768px) {
  .signup-content {
    padding: 20px 20px;
  }
  
  .signup-title {
    font-size: 24px;
  }
  
  .signup-form {
    padding: 0 8px;
  }
}
</style>
