<template>
  <div class="my-bookings-view">
    <HeaderComponent :showTabs="true" @tab-change="handleTabChange" />
    <MentorsBookingsContent @create-meeting="openCreateMeeting" />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import MentorsBookingsContent from '@/components/MentorsBookingsContent.vue'

export default {
  name: 'MentorsBookingsView',
  components: {
    HeaderComponent,
    MentorsBookingsContent
  },
  methods: {
    handleTabChange(tab) {
      if (tab === 'sessions') {
        this.$router.push('/dashboard')
      }
    },
    openCreateMeeting() {
      // 预留：打开创建会议的弹窗或跳转创建页面
      // this.$router.push('/meetings/create')
      console.log('Open create meeting')
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