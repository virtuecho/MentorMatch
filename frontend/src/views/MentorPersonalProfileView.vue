<template>
  <div class="mentor-personal-profile-view">
    <HeaderComponent />
    <MentorPersonalProfileContent :mentorId="$route.params.id" />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import MentorPersonalProfileContent from '@/components/MentorPersonalProfileContent.vue'

export default {
  name: 'MentorPersonalProfileView',
  components: {
    HeaderComponent,
    MentorPersonalProfileContent
  }
}
</script>

<style scoped>
.mentor-personal-profile-view {
  min-height: 100vh;
  background-color: #ffffff;
}
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 5%;
}
</style>