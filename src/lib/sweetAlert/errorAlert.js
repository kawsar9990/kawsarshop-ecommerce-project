import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const errorAlert = (msg)  =>{
Swal.fire({
  title: msg,
  icon: "error",
  draggable: true
});} 

