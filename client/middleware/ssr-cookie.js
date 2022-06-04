// import authService from "@/api/auth";
// export default function({store}) {
//     console.log('halooo')
//     console.log(store)
//     return
//         authService.checkSessionExpire().then(response => {
//             console.log(response.data)
//           if (response.data.status === 410) {
//             store.dispatch('users/me', [])
//           } else {
//             store.dispatch("users/me", response.data);
//           }
//         });
//       }