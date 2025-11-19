<template>
  <div class="mentee-dashboard">
    <HeaderComponent 
      :show-tabs="true"
      :active-tab="activeTab"
      @search="handleSearch"
      @tab-change="handleTabChange"
    />
    <MenteeDashboardContent ref="dashboardContent" />
  </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import MenteeDashboardContent from '../components/MenteeDashboardContent.vue'

export default {
  name: 'MenteeDashboard',
  components: {
    HeaderComponent,
    MenteeDashboardContent
  },
  data() {
    return {
      activeTab: 'sessions',
      searchQuery: ''
    }
  },
  methods: {
    handleTabChange(tab) {
      this.activeTab = tab
      this.$refs.dashboardContent.setActiveTab(tab)
    },
    handleSearch(query) {
      this.searchQuery = query
      this.$refs.dashboardContent.setSearchQuery(query)
    }
  }
}
</script>

<style scoped>
.mentee-dashboard {
  min-height: 100vh;
  background-color: #ffffff;
}
</style>