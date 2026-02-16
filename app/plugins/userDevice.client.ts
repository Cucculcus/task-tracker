export default defineNuxtPlugin((nuxtApp) => {
  const userConfig = useUserConfigStore()

  const updateDevice = () => {
    userConfig.isMobile = window.innerWidth <= userConfig.minW
  }

  updateDevice()

  window.addEventListener('resize', updateDevice)
})
