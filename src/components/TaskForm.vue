<template>
    <form @submit.prevent="handleSubmit" class="task-form">
      <input type="text" placeholder="I need to ..." v-model="newTask" class="task-input">
      <button class="btn btn-primary" type="submit">Add</button>
    </form>
</template>

<script>
import { useTaskStore } from '@/store/taskStore';
import { ref } from 'vue';

export default {
    setup() {
        const taskStore = useTaskStore()
        const newTask = ref('')
        const handleSubmit = () => {
            if(newTask.value.length > 0){
                taskStore.addTask({
                    title: newTask.value,
                    isFav: false,
                    id:  Math.floor(Math.random() * 10000   ) 
                })
                newTask.value = ''
            }
        }
        return {handleSubmit, newTask}
    }
}
</script>