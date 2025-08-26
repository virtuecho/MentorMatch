<template>
  <div class="signup-view">
    <HeaderComponent />
    <SignUpViewContent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import SignUpViewContent from '@/components/SignUpViewContent.vue'

export default {
  name: 'SignUpView',
  components: {
    HeaderComponent,
    SignUpViewContent
  }
}
</script>

<style scoped>
.signup-view {
  width: 100%;
  min-height: 100vh;
  background: #F7FAFC;
}
</style>