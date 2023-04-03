import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//Original
// export default defineConfig({
//   plugins: [react()],
// });


//Reference on how to dockerize React App using Vite https://dev.to/nandhakumar/step-by-step-guide-to-dockerize-react-app-created-using-vite-2jg3

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // needed for the Docker Container port mapping to work
    port: 80, // you can replace this port with any port
  }

})



