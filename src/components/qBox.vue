<template>
    <div class="qBox">
        <div class="topBox">
           {{ myData.question }} 
        </div>

        <div class="midBox">
            <ul>
                <li v-for="value,index in allAnswers" 
                :key="index"
                 @click="selectedIndex(index)" 
                :class="{selected : currentIndex === index , correct: checkIfAnswerisCorrect == index ,incorrect: checkIfAnswerisInCorrect == index }">
                   {{ value }}
                </li>
            </ul>
        </div>   

        <div class="botBox">
            <button @click="handleSubmit" >Submit</button>
            <button  @click="handleNext">Next</button>
        </div>
    </div> 
</template>

<script setup>
import _ from "lodash";
import { computed,ref} from "vue";
const props = defineProps(['myData','incCounter','totalCorrectCount','totalInCorrectCount'])

const currentIndex =ref(null)
const correctAnswerIndex= ref(null)
const checkIfAnswerisCorrect = ref(null)
const checkIfAnswerisInCorrect = ref(null)



const handleNext= ()=>{
    props.incCounter()
    currentIndex.value = null
    checkIfAnswerisCorrect.value = ref(null)
    checkIfAnswerisInCorrect.value = ref(null)
}

const selectedIndex = (i)=>{
    currentIndex.value = i
}

const handleSubmit = ()=>{
    if (correctAnswerIndex.value == currentIndex.value ){
        checkIfAnswerisCorrect.value = currentIndex.value
        props.totalCorrectCount()
        currentIndex.value = null
    }
    else if(currentIndex.value != null) {
        checkIfAnswerisInCorrect.value = currentIndex.value
        props.totalInCorrectCount()
        currentIndex.value = null
    } 
    
}

const allAnswers = computed(()=>{
  let answer =  [...props.myData.incorrect_answers] 
  answer.push(props.myData.correct_answer)
  let shuffledAnswer = _.shuffle(answer)
  correctAnswerIndex.value = shuffledAnswer.indexOf(props.myData.correct_answer)
  console.log(correctAnswerIndex.value);
  return shuffledAnswer
}) 
</script>