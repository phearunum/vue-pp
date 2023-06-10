<style scoped>
  .loginForm{
    width: 400px;
    margin: 0 auto;
  }
</style>
<template>
  <div class="loginForm">
    <div>
        <Title :level="2">{{ $t('login.application login') }}</Title>
        <Divider> Account </Divider>

        <Form>
            <FormItem prop="username">
                <Input v-model="loginFrom.username" :placeholder="$t('login.username')" size="large" prefix="ios-contact" />
            </FormItem>
            <FormItem prop="password">
                <Input v-model="loginFrom.password" :placeholder="$t('login.password')" size="large" prefix="ios-lock-outline" />
            </FormItem>
            <FormItem>
               <Select style="width: 100px;" v-model="$i18n.locale" @on-change="ChangeLagguage" > 
                   <Option v-for="locale in $i18n.availableLocales" 
                   :key="`locale-${locale}`" 
                   :value="locale"> {{ locale }}</Option>
               </Select>
                <Button type="primary" size="large" class="mt-4" @click="AppLogin" long> {{ $t('login.login') }} </Button>
            </FormItem>
        </Form>
    </div>
  </div>
</template>
<script setup name="login">
import { getCurrentInstance, ref } from "vue";
const { proxy } = getCurrentInstance();
import useUserStore from "@/stores/modules/user";
const userStore = useUserStore();
const loginFrom = ref({
    username: '',
    password:''
})
const AppLogin = () => {
    userStore.login(loginFrom.value)
        .then(() => {
            proxy.$Message.success('Success')
            proxy.$router.push({name:'home'})
        })
        .catch((err) => {
            console.log(err)
            proxy.$Message.error('Error Login')
        })

}

const ChangeLagguage = async () => {
   localStorage.setItem('lang',proxy.$i18n.locale)
}

</script>
