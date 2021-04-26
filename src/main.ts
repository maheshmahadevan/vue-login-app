import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-icons/iconfont/material-icons.css'

// Import the Auth0 configuration
import authConfig from "../auth_config.json";

// Import the plugin here
import { setupAuth } from './auth'
import { RouteLocationRaw } from 'vue-router';


function callBackRedirect(appState: { targetUrl: RouteLocationRaw; }){
    router.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
      );
}
  

const app = createApp(App).use(router);
setupAuth(authConfig, callBackRedirect).then((auth) => {
    app.use(auth).mount('#app')
})
