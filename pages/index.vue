import { RouterLink } from 'vue-router';
<template>
  <div>
    <h1>ユーザー管理システム</h1>
    <ul>
      <li><RouterLink to="/users">ユーザー一覧</RouterLink></li>
      <li><RouterLink to="/departments">部署一覧</RouterLink></li>
    </ul>
  </div>
</template>
