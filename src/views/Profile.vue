<template>
  <div>
    <div>
      <img :src="$auth.user.value.picture">
      <h2>{{ $auth.user.value.name }}</h2>
      <p>{{ $auth.user.value.email }}</p>
    </div>

    <div>
      <pre>{{ JSON.stringify($auth.user.value, null, 2) }}</pre>
    </div>
  </div>
</template>