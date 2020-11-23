<template>
  <v-sheet rounded="lg" class="pa-2" elevation="6">
    <v-list>
      <!-- 회원 프로필 사진 -->
      <v-list-item>
        <v-list-item-avatar
          class="mx-auto"
          :color="userData.isStudent ? 'accent' : 'error'"
          size="64"
        >
          <v-img
            class="elevation-6"
            alt="User Avatar"
            :src="userData.avatarPath"
          ></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <!-- 사용자 이름 및 이메일 주소 -->
      <v-list-item>
        <v-list-item-content class="text-center">
          <v-list-item-title class="text-h5 font-weight-bold">
            {{ userData.name }}
          </v-list-item-title>

          <v-list-item-subtitle>
            {{ userData.isStudent ? "학생" : "선생님" }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <!-- 과목 세부 리스트 -->
    <v-list flat>
      <v-list-item-group color="light-blue darken-2">
        <!-- v-for 디렉티브를 사용해 리스트 출력 -->
        <div v-for="(data, index) in menuList" :key="index">
          <v-list-item :to="{ name: data.route }" exact>
            <v-list-item-icon>
              <v-icon size="26">
                {{ data.icon }}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-title class="subtitle-1">
              {{ data.text }}
            </v-list-item-title>
          </v-list-item>
        </div>
      </v-list-item-group>
    </v-list>
  </v-sheet>
</template>

<script>
export default {
  props: {
    userData: Object,
    menuList: Array
  }
};
</script>

<style></style>
