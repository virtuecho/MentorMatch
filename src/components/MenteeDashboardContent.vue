<template>
  <div class="dashboard-content">


    <!-- Main Content -->
    <div class="main-content">
      <!-- Filters Section -->
      <div class="filters-section">
        <h3 class="filters-title">Filters</h3>
        
        <!-- Filter Dropdowns -->
        <div class="filter-dropdowns">
          <div class="filter-dropdown">
            <select v-model="selectedCity" class="filter-select">
              <option value="">Select city</option>
              <option value="sydney">Sydney</option>
            <option value="melbourne">Melbourne</option>
            <option value="brisbane">Brisbane</option>
            <option value="perth">Perth</option>
            <option value="adelaide">Adelaide</option>
            </select>
          </div>
          
          <div class="filter-dropdown">
            <select v-model="selectedMajor" class="filter-select">
              <option value="">Select major</option>
              <option value="computer-science">Computer Science</option>
              <option value="data-science">Data Science</option>
              <option value="ai-ml">AI & Machine Learning</option>
              <option value="art">Art</option>
            </select>
          </div>
        </div>
        
        <!-- Subject Tags -->
        <div class="subject-tags">
          <button 
            v-for="tag in subjectTags" 
            :key="tag.id"
            class="subject-tag"
            :class="{ active: selectedTags.includes(tag.id) }"
            @click="toggleTag(tag.id)"
          >
            {{ tag.name }}
          </button>
        </div>
      </div>

      <!-- Mentor Cards Grid -->
      <div class="mentors-grid">
        <div 
          v-for="mentor in filteredMentors" 
          :key="mentor.id"
          class="mentor-card"
          @click="goToMentorProfile(mentor)"
          role="button"
          tabindex="0"
          @keydown.enter.prevent="goToMentorProfile(mentor)"
        >
          <div class="mentor-avatar">
            <img :src="mentor.avatar" :alt="mentor.name" />
          </div>
          <div class="mentor-info">
            <h4 class="mentor-name">{{ mentor.name }}</h4>
            <p class="mentor-title">{{ mentor.title }}</p>
            <p class="mentor-company">{{ mentor.company }}</p>
            <div class="mentor-tags">
            <span 
              v-for="(tag, index) in mentor.tags" 
              :key="tag" 
              class="mentor-tag"
              :style="{ animationDelay: (index * 0.1) + 's' }"
            >
              {{ tag }}
            </span>
          </div>

            
          </div>
          <button class="book-btn" @click.stop="goToMentorProfile(mentor)">Book Session</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenteeDashboardContent',
  data() {
    return {
      activeTab: 'sessions',
      searchQuery: '',
      selectedCity: '',
      selectedMajor: '',
      selectedTags: [],
      subjectTags: [
        { id: 'ai', name: 'AI' },
        { id: 'ml', name: 'Machine Learning' },
        { id: 'cv', name: 'Computer Vision' },
        { id: 'thesis', name: 'Thesis Guidance' },
        { id: 'data-science', name: 'Data Science' },
        { id: 'art', name: 'Art' },
        { id: 'academic-writing', name: 'Academic Writing' },
        { id: 'computer-science', name: 'Computer Science' }
      ],
      mentors: [
        {
          id: 1,
          name: 'Dr. Sarah Chen',
          title: 'Senior AI Researcher',
          company: 'Google DeepMind',
          avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM0RjQ2RTUiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+U0M8L3RleHQ+Cjwvc3ZnPgo=',
          tags: ['AI', 'Machine Learning', 'Computer Vision'],


          city: 'sydney',
          major: 'ai-ml'
        },
        {
          id: 2,
          name: 'Prof. Michael Rodriguez',
          title: 'Data Science Professor',
          company: 'Stanford University',
          avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMwNTk2NjkiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+TVI8L3RleHQ+Cjwvc3ZnPgo=',
          tags: ['Data Science', 'Machine Learning', 'Academic Writing'],


          city: 'melbourne',
          major: 'data-science'
        },
        {
          id: 3,
          name: 'Dr. Emily Watson',
          title: 'Computer Vision Engineer',
          company: 'Tesla',
          avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNEQzI2MjYiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+RVc8L3RleHQ+Cjwvc3ZnPgo=',
          tags: ['Computer Vision', 'AI', 'Thesis Guidance'],


          city: 'brisbane',
          major: 'ai-ml'
        },
        {
          id: 4,
          name: 'James Liu',
          title: 'Senior Software Engineer',
          company: 'Microsoft',
          avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM3QzNBRUQiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+Skw8L3RleHQ+Cjwvc3ZnPgo=',
          tags: ['Computer Science', 'AI', 'Academic Writing'],


          city: 'perth',
          major: 'computer-science'
        },
        {
          id: 5,
          name: 'Dr. Anna Kowalski',
          title: 'Creative Director',
          company: 'Pixar Animation Studios',
          avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNFQTU4MEMiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+QUs8L3RleHQ+Cjwvc3ZnPgo=',
          tags: ['Art', 'Computer Vision', 'Thesis Guidance'],


          city: 'adelaide',
          major: 'art'
        },
        {
          id: 6,
          name: 'Dr. Robert Kim',
          title: 'Machine Learning Scientist',
          company: 'OpenAI',
          avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMwODkxQjIiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+Uko8L3RleHQ+Cjwvc3ZnPgo=',
          tags: ['Machine Learning', 'AI', 'Data Science'],


          city: 'sydney',
          major: 'ai-ml'
        }
      ]
    }
  },
  computed: {
    filteredMentors() {
      let filtered = this.mentors
      
      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(mentor => 
          mentor.name.toLowerCase().includes(query) ||
          mentor.title.toLowerCase().includes(query) ||
          mentor.company.toLowerCase().includes(query) ||
          mentor.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }
      
      // Filter by city
      if (this.selectedCity) {
        filtered = filtered.filter(mentor => mentor.city === this.selectedCity)
      }
      
      // Filter by major
      if (this.selectedMajor) {
        filtered = filtered.filter(mentor => mentor.major === this.selectedMajor)
      }
      
      // Filter by selected tags
      if (this.selectedTags.length > 0) {
        filtered = filtered.filter(mentor => 
          this.selectedTags.some(tagId => {
            const tagName = this.subjectTags.find(t => t.id === tagId)?.name
            return mentor.tags.includes(tagName)
          })
        )
      }
      
      return filtered
    }
  },
  methods: {
    toggleTag(tagId) {
      const index = this.selectedTags.indexOf(tagId)
      if (index > -1) {
        this.selectedTags.splice(index, 1)
      } else {
        this.selectedTags.push(tagId)
      }
    },
    setActiveTab(tab) {
      this.activeTab = tab
    },
    setSearchQuery(query) {
      this.searchQuery = query
    },
    goToMentorProfile(mentor) {
      this.$router.push(`/mentor-profile/${mentor.id}`)
    }
  }
}
</script>

<style scoped>
.dashboard-content {
  max-width: 1600px;
  margin: 0 auto;
  padding: 24px 5%;
}



/* Main Content */
.main-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 32px;
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Filters Section */
.filters-section {
  background: #ffffff;
}

.filters-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
}

.filter-dropdowns {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.filter-select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.filter-select:hover {
  border-color: #9ca3af;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.filter-select:focus {
  outline: none;
  border-color: #1f2937;
  box-shadow: 0 0 0 3px rgba(31, 41, 55, 0.1);
  transform: translateY(-2px);
}

/* Subject Tags */
.subject-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.subject-tag {
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.subject-tag::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(31, 41, 55, 0.1);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease;
}

.subject-tag:hover::before {
  width: 200px;
  height: 200px;
}

.subject-tag:hover {
  background: #e5e7eb;
  transform: translateY(-2px);
}

.subject-tag.active {
  background: #1f2937;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(31, 41, 55, 0.3);
}

.subject-tag.active::before {
  background: rgba(255, 255, 255, 0.1);
}

/* Mentors Grid */
.mentors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.mentors-grid .mentor-card {
  animation: slideInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.mentors-grid .mentor-card:nth-child(1) { animation-delay: 0.1s; }
.mentors-grid .mentor-card:nth-child(2) { animation-delay: 0.2s; }
.mentors-grid .mentor-card:nth-child(3) { animation-delay: 0.3s; }
.mentors-grid .mentor-card:nth-child(4) { animation-delay: 0.4s; }
.mentors-grid .mentor-card:nth-child(5) { animation-delay: 0.5s; }
.mentors-grid .mentor-card:nth-child(6) { animation-delay: 0.6s; }

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.mentor-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}



.mentor-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  transform: translateY(-8px) scale(1.02);
}

.mentor-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.mentor-avatar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 0 2px transparent;
  transition: box-shadow 0.3s ease;
}

.mentor-card:hover .mentor-avatar {
  transform: scale(1.05);
}

.mentor-card:hover .mentor-avatar::after {
  box-shadow: inset 0 0 0 2px rgba(31, 41, 55, 0.2);
}

.mentor-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.mentor-card:hover .mentor-avatar img {
  transform: scale(1.05);
}

.mentor-name {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.mentor-title {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 2px 0;
}

.mentor-company {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 16px 0;
}

.mentor-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.mentor-tag {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  color: #374151;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: tagFadeIn 0.5s ease-out;
  animation-fill-mode: both;
  position: relative;
  overflow: hidden;
}



.mentor-tag:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@keyframes tagFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}



.mentor-price {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
}

.book-btn {
  width: 100%;
  background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}



.book-btn:hover {
  background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(31, 41, 55, 0.3);
}

.book-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(31, 41, 55, 0.2);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .filters-section {
    order: -1;
  }
  
  .filter-dropdowns {
    flex-direction: row;
    gap: 12px;
  }
  
  .filter-dropdown {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .dashboard-content {
    padding: 16px 3%;
  }
  
  .nav-tabs {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .tab-controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .search-input-wrapper {
    min-width: 150px;
  }
  
  .mentors-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-dropdowns {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .tab-container {
    gap: 16px;
  }
  
  .tab-controls {
    gap: 8px;
  }
  
  .search-input-wrapper {
    min-width: 120px;
  }
  
  .mentor-card {
    padding: 16px;
  }
}
</style>