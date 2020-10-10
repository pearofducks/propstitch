<template>
  <div>
    <h1>sup</h1>
  </div>
</template>

<script>
export default {
  props: {
    foo: String,
    bar: Boolean,
    nope: null,
    prom: Promise,
    several: [String, Number],
    lots: {
      required: true,
      type: Number,
      default: 42
    }
  }
}
</script>
