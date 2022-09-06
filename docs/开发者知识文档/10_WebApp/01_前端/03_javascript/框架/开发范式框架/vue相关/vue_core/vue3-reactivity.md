
响应式

- defineProperty
- proxy
- setter getter

### 父子组件 v-model 绑定

- 父

```html
<template>
  this is parent's comment: {{comment}}
  <Child v-model:comment="comment"/>
</template>

<script setup>
import Rate from "../components/Child.vue";
import {ref} from "vue";

let comment = ref("cccc1");

</script>
```

- 子

```html
<template>
  <br>
  this is comment: {{ props.comment }}

  <br>
  <input type="text" v-model="commentInner">
  <br>{{ commentInner }}
</template>

<script setup>
import {ref, watch} from "vue";

let props = defineProps({
  comment: String
});

let commentInner = ref(props.comment);
let emits = defineEmits(["update:comment"]);
watch(commentInner, () => emits("update:comment", commentInner.value));

</script>
```