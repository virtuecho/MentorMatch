<template>
  <div class="login-content">
    <div class="body-box">
      <div class="subtitle">
        <h1>Log in to your account</h1>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="email-box">
          <div class="input-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              placeholder="Email" 
              required
            />
          </div>
        </div>
        
        <div class="password-box">
          <div class="input-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              placeholder="Password" 
              required
            />
          </div>
        </div>
        
        <div class="forgot-password-box">
          <a href="#" class="forgot-link">Forgot your password?</a>
        </div>
        
        <div class="login-button-box">
          <button type="submit" class="btn-login">Log In</button>
        </div>
        
        <div class="signup-box">
          <p>Don't have an account? <router-link to="/signup" class="signup-link">Sign up</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from '@/services/auth';

export default {
  name: 'LoginViewContent',
  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  methods: {
    async handleLogin() {
      // Login logic processing
      console.log('Login attempt:', {
        email: this.email,
        password: this.password
      });
      
      // The actual login API call can be added here
      try {
        const res = await login(this.email, this.password);

        // Store token
        localStorage.setItem('authToken', res.data.token);

        // Navigate to the next page
        // Not sure how or where to implement this so leave it to the frontend
      } catch (err) {
        console.error("Login failed:", err.response?.data || err.message);
        this.error = err.response?.data?.message || "Login failed. Please try again.";
      }
    }
  }
}
</script>

<style scoped>
.login-content {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  padding: 20px 160px;
  width: 100%;
  min-height: calc(100vh - 60px);
}

.body-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  width: 100%;
  max-width: 500px;
}

.subtitle {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  padding: 20px 16px 12px;
  margin-bottom: 40px;
}

.subtitle h1 {
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 28px;
  line-height: 1.25em;
  text-align: center;
  color: #0D141C;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 448px;
  gap: 24px;
}

.email-box {
  width: 100%;
}

.password-box {
  width: 100%;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-group label {
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5em;
  color: #0D141C;
  margin-bottom: 8px;
}

.input-group input {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #F7FAFC;
  border: 1px solid #CFDBE8;
  border-radius: 8px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  color: #0D141C;
  outline: none;
  transition: border-color 0.2s ease;
}

.input-group input::placeholder {
  color: #4D7399;
}

.input-group input:focus {
  border-color: #2B8FED;
  box-shadow: 0 0 0 3px rgba(43, 143, 237, 0.1);
}

.forgot-password-box {
  width: 100%;
  padding: 4px 16px 12px;
  text-align: center;
}

.forgot-link {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5em;
  color: #4D7399;
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #2B8FED;
  text-decoration: underline;
}

.login-button-box {
  width: 100%;
  padding: 12px 16px;
}

.btn-login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 16px;
  background: #2B8FED;
  border: none;
  border-radius: 8px;
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 1.5em;
  color: #F7FAFC;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.btn-login:hover {
  background: #1E7BD8;
  transform: translateY(-1px);
}

.btn-login:active {
  transform: translateY(0);
}

.signup-box {
  width: 100%;
  padding: 4px 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.signup-box p {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5em;
  text-align: center;
  color: #4D7399;
  margin: 0;
}

.signup-link {
  color: #2B8FED;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.signup-link:hover {
  color: #1E7BD8;
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .login-content {
    padding: 20px 80px;
  }
  
  .body-box {
    width: 100%;
    max-width: 800px;
  }
  
  .login-form {
    position: static;
    max-width: 100%;
  }
  
  .email-box,
  .password-box,
  .forgot-password-box,
  .login-button-box,
  .signup-box {
    position: static;
    width: 100%;
    max-width: 448px;
    margin: 0 auto 24px;
    left: auto;
    top: auto;
  }
  
  .forgot-password-box {
    text-align: center;
    margin-bottom: 12px;
  }
}

@media (max-width: 768px) {
  .login-content {
    padding: 20px 40px;
  }
  
  .subtitle h1 {
    font-size: 24px;
  }
  
  .email-box,
  .password-box,
  .login-button-box,
  .signup-box {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .login-content {
    padding: 20px 20px;
  }
  
  .subtitle {
    padding: 20px 8px 12px;
  }
  
  .subtitle h1 {
    font-size: 20px;
  }
}
</style>
