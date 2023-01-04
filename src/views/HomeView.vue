<script setup>
import qBoxVue from '../components/qBox.vue';
import {useStore} from "../stores/myStore"
import { ref } from "vue";
const data = useStore()
data.getData()
const finished = ref(false)


const totalCorrectCount = ref(0)
const totalInCorrectCount = ref(0)

const totalCorrectCountIncrease=()=>{
    totalCorrectCount.value++
}
const totalInCorrectCountIncrease=()=>{
    totalInCorrectCount.value++
}

const increaseCounter = ()=>{
      data.counter < data.ques.length-1 ?  data.counter ++ : finished.value = true
}


</script>

<template>
<div>
    <div v-if="finished" class="finished"><span class="congrat">Congrat :)</span>u done with Quizz you can see result in top of screen.</div>
    <div v-else>
        <qBoxVue  
        :myData="data.ques[data.counter]" 
        :incCounter="increaseCounter"
        :totalCorrectCount="totalCorrectCountIncrease"
        :totalInCorrectCount="totalInCorrectCountIncrease"
         v-if="!data.Loading" />
        <div v-else> Loading ...  </div>
    </div>
    <div class="result">Total Correct Answer is : " {{ totalCorrectCount }} " and Total InCorrect Answer is : " {{totalInCorrectCount}} " of Total 10 Question</div>
</div>
</template>
