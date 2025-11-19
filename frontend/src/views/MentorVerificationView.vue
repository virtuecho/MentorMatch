<template>
  <div class="mentor-verification-view">
    <HeaderComponent />
    <MentorVerificationContent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import MentorVerificationContent from '@/components/MentorVerificationContent.vue'

export default {
  name: 'MentorVerificationView',
  components: {
    HeaderComponent,
    MentorVerificationContent
  }
}
</script>

<style scoped>
.mentor-verification-view {
  min-height: 100vh;
  background-color: #f8fafc;
}
</style>