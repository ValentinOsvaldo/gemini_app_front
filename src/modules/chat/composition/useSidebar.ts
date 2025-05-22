import { ref } from 'vue';

const openSidebar = ref(true);

export const useSidebar = () => {
  const toggleSidebar = () => {
    openSidebar.value = !openSidebar.value;
  };

  return {
    openSidebar,
    toggleSidebar,
  };
};
