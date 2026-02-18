import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const sendalert = ()  =>{
  Swal.fire({
  title: "Sent!",
  icon: "success",
  draggable: true
});
} 

export default sendalert;