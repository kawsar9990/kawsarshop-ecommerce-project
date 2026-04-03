import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const sendalert = (msg)  =>{
  Swal.fire({
  title: msg,
  icon: "success",
  draggable: true
});} 

