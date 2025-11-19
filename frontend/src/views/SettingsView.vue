<template>
  <div class="settings-view">
    <HeaderComponent />
    <SettingsContent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import SettingsContent from '@/components/SettingsContent.vue'

export default {
  name: 'SettingsView',
  components: {
    HeaderComponent,
    SettingsContent
  }
}
</script>

<style scoped>
.settings-view {
  min-height: 100vh;
  background: #f7fafc;
}
</style>