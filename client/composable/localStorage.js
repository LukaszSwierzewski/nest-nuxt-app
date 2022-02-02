import { ref, computed } from "@nuxtjs/composition-api";
export default function localStorageSaving() {
  let arrayFromLocal = ref([])
  let valueToSave = ref('')
  const arrayPusher = (arr) => {
    arr.push(valueToSave.value)
    valueToSave.value = ''
  }
  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
  const getFromLocalStorage = (key) => {
    let data = JSON.parse(localStorage.getItem(key))
    if (data === null) data = []
    return data
  }

  return { arrayFromLocal, arrayPusher, saveToLocalStorage, getFromLocalStorage, valueToSave };
}