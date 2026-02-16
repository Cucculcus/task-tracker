export const useUserConfigStore = defineStore('userConfig', () => {
  const minW = 640
  const isMobile = ref(true)

  return { isMobile, minW }
})
