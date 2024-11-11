import { defineStore } from 'pinia';

export type Task = {
  id: number;
  title: string;
  isFav: boolean;
};

export type TaskState = {
  tasks: Task[];
  isLoading: boolean;
};

export const useTaskStore = defineStore('taskStore', {
  state: (): TaskState => ({
    tasks: [],
    isLoading: false,
  }),
  getters: {
    favs(state): Task[] {
      return state.tasks.filter((task) => task.isFav);
    },
    favCount(state): number {
      return state.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },
    totalCount(state): number {
      return state.tasks.length;
    },
  },
  actions: {
    async getTask() {
      const res = await fetch('http://localhost:3000/tasks');
      const data = await res.json();
      this.tasks = data;
    },
    async addTask(task: Task) {
      this.tasks.push(task);
      try {
        const res = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          body: JSON.stringify(task),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.log(errorData);
        }
      } catch (error) {
        console.error('Network or unexpected error:', error);
      }
    },
    async deleteTask(id: number) {
      const taskToDelete = this.tasks.find((t) => t.id === id);
      if (taskToDelete) {
        this.tasks = this.tasks.filter((t) => t.id !== id);

        try {
          const res = await fetch(`http://localhost:3000/tasks/` + id, {
            method: 'DELETE',
          });

          if (!res.ok) {
            const errorData = await res.json();
            console.log('Failed to delete task:', errorData);
          }
        } catch (error) {
          console.error('Network or unexpected error:', error);
        }
      } else {
        console.log('Task not found');
      }
    },
    async toggleFav(id: number) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) {
        task.isFav = !task.isFav;
      }
      try {
        const res = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ isFav: task?.isFav }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          let errorMessage = 'An error occurred while updating the task';

          try {
            const errorData = await res.json();
            errorMessage = errorData.message || errorMessage;
          } catch (jsonError) {
            const errorText = await res.text();
            errorMessage = errorText || errorMessage;
          }

          throw new Error(errorMessage);
        }

        const responseData = await res.json();
        console.log('Task updated successfully', responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
});
