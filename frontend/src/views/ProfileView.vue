<template>
  <div class="profile-view">
    <HeaderComponent />
    <ProfileContent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import ProfileContent from '@/components/ProfileContent.vue'

export default {
  name: 'ProfileView',
  components: {
    HeaderComponent,
    ProfileContent
  }
}
</script>

<style scoped>
.profile-view {
  min-height: 100vh;
  background: #eeeeee;
}
</style>