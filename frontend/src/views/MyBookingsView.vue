<template>
  <div class="my-bookings-view">
    <HeaderComponent 
      :showTabs="true" 
      @tab-change="handleTabChange"
    />
    <MyBookingsContent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import MyBookingsContent from '@/components/MyBookingsContent.vue'

export default {
  name: 'MyBookingsView',
  components: {
    HeaderComponent,
    MyBookingsContent
  },
  methods: {
    handleTabChange(tab) {
      if (tab === 'sessions') {
        this.$router.push('/dashboard')
      }
    }
  }
}
</script>

<style scoped>
.my-bookings-view {
  min-height: 100vh;
  background-color: #ffffff;
}
</style>