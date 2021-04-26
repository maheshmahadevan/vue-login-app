import createAuth0Client, { Auth0Client, Auth0ClientOptions, GetIdTokenClaimsOptions, GetTokenSilentlyOptions, GetTokenWithPopupOptions, LogoutOptions, RedirectLoginOptions,User } from '@auth0/auth0-spa-js'
import { computed, reactive, watchEffect } from 'vue'
import { RouteLocationRaw } from 'vue-router';

let client: Auth0Client;

interface State{
  loading: boolean,
  isAuthenticated: boolean,
  user: User | undefined,
  popupOpen: boolean,
  error: null,
}

const state: State = reactive({
  loading: true,
  isAuthenticated: false,
  user: {},
  popupOpen: false,
  error: null,
})

async function loginWithPopup() {
  state.popupOpen = true

  try {
    await client.loginWithPopup()
  } catch (e) {
    console.error(e)
  } finally {
    state.popupOpen = false
  }

  state.user = await client.getUser()
  state.isAuthenticated = true
}

async function handleRedirectCallback() {
  state.loading = true

  try {
    await client.handleRedirectCallback()
    state.user = await client.getUser()
    state.isAuthenticated = true
  } catch (e) {
    state.error = e
  } finally {
    state.loading = false
  }
}

function loginWithRedirect(o: RedirectLoginOptions | undefined) {
  return client.loginWithRedirect(o)
}

function getIdTokenClaims(o: GetIdTokenClaimsOptions | undefined) {
  return client.getIdTokenClaims(o)
}

function getTokenSilently(o: GetTokenSilentlyOptions | undefined) {
  return client.getTokenSilently(o)
}

function getTokenWithPopup(o: GetTokenWithPopupOptions | undefined) {
  return client.getTokenWithPopup(o)
}

function logout(o: LogoutOptions | undefined) {
  return client.logout(o)
}

const authPlugin = {
  isAuthenticated: computed(() => state.isAuthenticated),
  loading: computed(() => state.loading),
  user: computed(() => state.user),
  getIdTokenClaims,
  getTokenSilently,
  getTokenWithPopup,
  handleRedirectCallback,
  loginWithRedirect,
  loginWithPopup,
  logout,
}

export const routeGuard = (to: { fullPath: any; }, from: any, next: () => any) => {
  const { isAuthenticated, loading, loginWithRedirect } = authPlugin

  const verify = () => {
    // If the user is authenticated, continue with the route
    if (isAuthenticated.value) {
      return next()
    }

    // Otherwise, log in
    loginWithRedirect({ appState: { targetUrl: to.fullPath } })
  }

  // If loading has already finished, check our auth state using `fn()`
  if (!loading.value) {
    return verify()
  }

  // Watch for the loading property to change before we check isAuthenticated
  watchEffect(() => {
    if (loading.value === false) {
      return verify()
    }
  })
}

export const setupAuth = async (options: Auth0ClientOptions, callbackRedirect: { (appState: { targetUrl: RouteLocationRaw; }): void; (arg0: any): void; }) => {
  client = await createAuth0Client({
    ...options,
  })

  try {
    // If the user is returning to the app after authentication
    

    if (
      window.location.search.includes('code=') &&
      window.location.search.includes('state=')
    ) {
      // handle the redirect and retrieve tokens
      const { appState } = await client.handleRedirectCallback()

      // Notify subscribers that the redirect callback has happened, passing the appState
      // (useful for retrieving any pre-authentication state)
      callbackRedirect(appState)
    }
  } catch (e) {
    state.error = e
  } finally {
    // Initialize our internal authentication state
    state.isAuthenticated = await client.isAuthenticated()
    state.user = await client.getUser()
    state.loading = false
  }

  return {
    install: (app: any) => {
      app.config.globalProperties.$auth = authPlugin
    },
  }
}