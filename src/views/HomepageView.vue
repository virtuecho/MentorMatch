<template>
  <div class="homepage-view">
    <HeaderComponent />
    <HomepageContent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import HomepageContent from '@/components/HomepageContent.vue'

export default {
  name: 'HomepageView',
  components: {
    HeaderComponent,
    HomepageContent
  }
}
</script>

<style scoped>
.homepage-view {
  width: 100%;
  min-height: 100vh;
  background: #F7FAFC;
}
</style>