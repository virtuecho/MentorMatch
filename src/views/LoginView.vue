<template>
  <div class="login-view">
    <HeaderComponent />
    <LoginViewContent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import LoginViewContent from '@/components/LoginViewContent.vue'

export default {
  name: 'LoginView',
  components: {
    HeaderComponent,
    LoginViewContent
  }
}
</script>

<style scoped>
.login-view {
  width: 100%;
  min-height: 100vh;
  background: #F7FAFC;
}
</style>