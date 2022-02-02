import { reactive, computed, toRefs, onMounted, ref } from "@nuxtjs/composition-api";
export default function useEventSpace() {
  let counter = ref(0)
  const counterInc = () => {
    counter.value++
  }
  const event = reactive({
    capacity: ref(4),
    attending: ["Tim", "Bob", "Joe"],
    spacesLeft: computed(() => {
      return event.capacity - event.attending.length;
    })
  });

  function increaceCapacity() {
    event.capacity++;
  }

  return { ...toRefs(event), increaceCapacity, counter, counterInc };
}