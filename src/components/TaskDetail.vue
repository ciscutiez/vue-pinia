<script>
import { useTaskStore } from '@/store/taskStore';

export default {
  props: ['task'],
  setup() {
    const taskStore = useTaskStore();
    return { taskStore };
  }
}
</script>

<template>
  <div class="task-card">
    <h3 class="task-title">{{ task.title }}</h3>
    <div class="task-actions">
      <button @click="taskStore.deleteTask(task.id)" class="btn btn-danger">Delete</button>
      <button @click="taskStore.toggleFav(task.id)" class="btn" :class="{ 'btn-favorite': task.isFav }">
        {{ task.isFav ? 'Unfavorite' : 'Favorite' }}
      </button>
    </div>
  </div>
</template>
