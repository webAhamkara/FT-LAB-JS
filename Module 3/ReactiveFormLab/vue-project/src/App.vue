<template>
  <div className="registration">
    <input type="text" placeholder="Имя" v-model="userName" />
    <input type="text" placeholder="Фамилия" v-model="userSurname" />
    <div className="registration__password-section">
      <input :type="showPass ? 'text' : 'password'" placeholder="Пароль" v-model="userPass" />
      <input
        :type="showPass ? 'text' : 'password'"
        placeholder="Подтверждение пароля"
        v-model="userPassConf"
      />
      <button className="showPass" @mouseup="showPass = false" @mousedown="showPass = true">
        <svg
          width="47"
          height="27"
          viewBox="0 0 47 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.9661 13.1667C29.9661 16.2044 27.056 18.6667 23.466 18.6667C19.8763 18.6667 16.9661 16.2044 16.9661 13.1667C16.9661 10.1291 19.8763 7.66675 23.466 7.66675C27.056 7.66675 29.9661 10.1291 29.9661 13.1667Z"
            stroke="black"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M23.9661 2.66675C14.1119 2.66675 5.77043 7.29127 2.96606 13.6667C5.77039 20.0422 14.1119 24.6667 23.9661 24.6667C33.8202 24.6667 42.1617 20.0422 44.9661 13.6667C42.1617 7.29132 33.8202 2.66675 23.9661 2.66675Z"
            stroke="black"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <div className="registration__radio">
      <label className="radio-label">
        <input type="radio" value="male" v-model="userGender" /> Мужской
      </label>
      <label className="radio-label">
        <input type="radio" value="female" v-model="userGender" /> Женский
      </label>
    </div>
    <button
      @click="sendData()"
      :disabled="userPass !== userPassConf && userPassConf != ''"
      className="sendingButton"
    >
      Зарегистрироваться
    </button>
  </div>
  <p className="error">{{ error }}</p>
  <p v-if="userGender && userName.length != 0">
    Пользователь: {{ userName }}. {{ userGender === 'male' ? 'Мужской' : 'Женский' }} пол.
  </p>
</template>

<script setup>
import { ref } from 'vue'
const userName = ref('')
const userSurname = ref('')
const userGender = ref('')
const userPass = ref('')
const userPassConf = ref('')
const error = ref('')
const showPass = ref(false)
let users = ref([])
function sendData() {
  if (userName.value == '') {
    error.value = 'Введите имя!'
    return
  } else if (userSurname.value == '') {
    error.value = 'Введите Фамилию!'
    return
  } else if (userPass.value == '') {
    error.value = 'Введите пароль!'
    return
  } else if (userPassConf.value == '') {
    error.value = 'Подтвердите пароль!'
    return
  } else if (userGender.value == '') {
    error.value = 'Выберете пол!'
    return
  } else {
    error.value = ''
    users.value.push({
      name: userName.value,
      surname: userSurname.value,
      pass: userPass.value,
      gender: userGender.value,
    })
    console.log({
      Имя: userName.value,
      Фамилия: userSurname.value,
      Пароль: userPass.value,
      Пол: userGender.value,
    })
  }
}
</script>

<style scoped>
.registration {
  display: inline-flex;
  flex-direction: column;
  width: 300px;
  gap: 10px;
}
.registration .sendingButton {
  width: 200px;
  height: 50px;
  border-radius: 15px;
  background:
    linear-gradient(
      290deg,
      rgba(19, 120, 138, 0.29) 0%,
      rgba(46, 190, 115, 0.86) 35%,
      transparent 65%,
      rgb(38, 112, 174) 90%,
      rgb(68, 139, 182) 100%
    ),
    radial-gradient(
        ellipse at 65% 40%,
        rgb(47, 166, 122) 0%,
        rgb(35, 135, 99) 35%,
        rgb(33, 115, 136) 60%,
        rgb(41, 182, 117) 80%,
        rgb(46, 147, 199) 100%
      )
      85% 80%/180% 105%;

  font-size: 20px;
  color: rgb(0, 0, 0);
  cursor: pointer;
  transition: 0.5s ease;
  border: none;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}

.registration .sendingButton:hover {
  scale: 1.03;
  filter: brightness(1.1);
}
.registration input {
  border-radius: 10px;
  height: 30px;
  padding-left: 5px;
}
.registration__password-section {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: 0.5s ease;
}
.registration .showPass {
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translate(0%, -50%);
  border: none;
  background-color: transparent;
}
.registration .sendingButton:disabled {
  background: red;
}
.registration .sendingButton:disabled:hover {
  scale: 1;
  filter: none;
  cursor: not-allowed;
}

.error {
  font-size: 20px;
  color: red;
  font-weight: bold;
}
.registration__radio {
  display: flex;
  gap: 20px;
}
.radio-label {
  display: flex;
  align-items: center;
}
</style>
