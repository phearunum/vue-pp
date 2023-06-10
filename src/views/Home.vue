<template>
    <div>
        <Card :border="false">
            <Row>
                <Col :xs="24" :sm="8" :md="8" :lg="8" >
                <Card clas="text-white " style="background-color: #2b85e4;">
                    <div class="h-40 text-white">
                        <p :leve="4" class="text-white  text-2xl mb-8"> ចំនួយទឹកប្រាក់ </p>
                        <span class="text-white text-4xl"> {{ Income - Exspend }} </span>

                    </div>
                </Card>
                </Col>
                <Col class="mt-4" :xs="{ span: 24, offset: 1 }" 
                :sm="{ span: 8, offset: 0 }"
                :md="{ span: 8, offset: 0 }"
                :lg="{ span: 8 }">
                <Row>
                    <Col :xs="12" :md="{ span: 11, offset: 1 }" :lg="6">
                    <Circle :size="200" :trail-width="4" :stroke-width="5" :percent="75" stroke-linecap="square"
                        class="text-orange-600" stroke-color="#ff9900">
                        <div class="demo-Circle-custom">
                            <h1>{{ Exspend }}</h1>
                            <h3> ចំណាយ</h3>
                            <span>


                            </span>
                        </div>
                    </Circle>
                    </Col>
                    <Col :xs="{ span: 11, offset: 1 }" :md="{ span: 11, offset: 1 }" :lg="6">
                    <Circle :size="200" :trail-width="4" :stroke-width="5" :percent="75" stroke-linecap="square"
                        class="text-green-600" stroke-color="#5cb85c">
                        <div class="demo-Circle-custom">
                            <h1>{{ Income }}</h1>
                            <h3> ចំណូល</h3>
                        </div>
                    </Circle>
                    </Col>

                </Row>

                </Col>
                <Col :xs="{ span: 16, offset: 0 }" 
                     :sm="{ span: 16, offset: 0 }" 
                     :md="{ span: 16, offset: 0 }" 
                     :lg="8"
                    class="mt-4 ">
                   <Space>
                      <Input  type="date" v-model="fdate" placeholder="from date"/>
                      <Input type="date" v-model="tdate" placeholder="to date"/>
                      <Button type="primary" @click="loadData"> OK </Button>
                   </Space>
                       
                </Col>

                <Col :md="24" :xs="24" :lg="24" class="mt-4">
                    <Grid :col="4">
                        <GridItem>
                            <router-link to="/transaction">
                                <Icon type="ios-swap" style="font-size: 2rem" /> <br /> ប្រតិប័ត្រការណ៍
                            </router-link>
                        </GridItem>
                        <GridItem>
                            <router-link to="/category">
                                <Icon type="ios-git-network" style="font-size: 2rem" /><br /> ប្រភេទ
                            </router-link>

                        </GridItem>
                        <GridItem>
                            <router-link to="/report">
                                <Icon type="ios-pie-outline" style="font-size: 2rem" />
                                <br /> របាយការណ៍
                            </router-link>
                        </GridItem>
                        <GridItem>
                            <Icon type="ios-card" style="font-size: 2rem" /> <br /> គណនីយ
                        </GridItem>

                    </Grid>
                </Col>
                <Col :md="24" :xs="24" class="mt-4" >
                    <Alert v-for="t in lastTransaction" :key="t.id" type="success">
                     <p class="text-l">#NO{{ t.id }} {{ t.name }}</p>
                     <p class="text-l"> {{ t.amount }} $</p>
                      
                    </Alert>
                  
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script setup>

import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import useUserStore from "../stores/modules/user";
import { listUser } from '../api/login'
import { getTransaction,listTransaction } from '../api/transaction'
const { proxy } = getCurrentInstance();
const userStore = useUserStore()
const userList = ref([])
const Income = ref('00.00')
const Exspend = ref('00.00')
const fdate = ref(new Date().toISOString().slice(0, 10))
const tdate = ref(new Date().toISOString().slice(0, 10))
const lastTransaction = ref([])

const columns = ref([

    {
        "title": "fname",
        "key": "fname",

        "width": 200
    },
    {
        "title": "lname",
        "key": "lname",

    },


])
const loadData = () => {
    Income.value = '00'
    Exspend.value = '00'
    getTransaction({
        fdate: fdate.value,
        tdate: tdate.value
    }).then((data) => {

        Income.value = data.data[1].total
        Exspend.value = data.data[0].total
    }).catch((err) => {
        console.log(err)
    })
}
const loadDataList = (_page=1) => {
    listTransaction({
        page: parseInt(_page-1),
        limit: 10,
        q:""
    }).then((res) => {
       lastTransaction.value=res.data.data
    })
}

onMounted(() => {
    loadData()
    loadDataList()
})


</script>
