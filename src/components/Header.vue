<style scoped>
  .app-logo{
    width: 70%;
  }
  .app-nav-profile{
    width: 30%;
    float: right;  
  }
</style>
<template>
    <div>
        <Header class="bg-blue-500 p-1 px-6 flex">
            <div class="app-logo justify-start">
                <Icon @click="value1 = true" class=" text-2xl text-white cursor-pointer " 
                type="ios-menu" /> <span  class="text-2xl text-white px-6">បញ្ចីការ</span>
                <Drawer title="Basic Drawer" placement="left" :closable="false" v-model="value1">
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </div>
            <div class="app-nav-profile flex justify-end text-white">
                <Dropdown class="mr-3 text-white">
                    <a href="javascript:void(0)">
                                <Icon type="ios-person-outline" class="text-2xl text-white" />
                                <Icon type="ios-arrow-down" class="text-white"/>
                    </a>
                    <template #list>
            <DropdownMenu>
                <DropdownItem>  <Icon type="ios-settings-outline" />  Account</DropdownItem>
                <DropdownItem> <Icon type="ios-help-circle-outline" />  Help</DropdownItem>
                
                <DropdownItem @click="logout">  <Icon type="ios-log-out" /> Logout  </DropdownItem>
              
            </DropdownMenu>
        </template>
                </Dropdown>         
            </div>
        </Header>
    </div>
</template>

<script setup>
 
 
</script>