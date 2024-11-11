<script setup lang="ts">
import { useTaskStore } from "./store/taskStore"
import TaskForm from "./components/TaskForm.vue";
import TaskDetail from "./components/TaskDetail.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";

const taskStore = useTaskStore()
const filter = ref('all')
taskStore.getTask()
const { tasks, isLoading, favs, totalCount, favCount } = storeToRefs(taskStore)
</script>
<template>
  <div class="task-container">
    <header class="header">
      <h1>Pinia Tasks</h1>
    </header>

    <TaskForm />

    <nav class="filter">
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }" class="btn">All tasks</button>
      <button @click="filter = 'favs'" :class="{ active: filter === 'favs' }" class="btn">Fav tasks</button>
    </nav>
    <div v-if="isLoading"> loading task</div>
    <div v-if="filter === 'all'">
      <p class="task-count">You have {{ totalCount }} tasks left to do</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetail :task="task" />
      </div>
    </div>

    <div v-if="filter === 'favs'">
      <p class="task-count">You have {{ favCount }} favorite tasks</p>
      <div v-for="task in favs" :key="task.id">
        <TaskDetail :task="task" />
      </div>
    </div>
    <button @click="taskStore.$reset">Reset</button>
  </div>
</template>
