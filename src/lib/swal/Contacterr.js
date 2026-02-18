import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const errorAlert = ()  =>{
Swal.fire({
  title: "Sorry, Try Again!",
  icon: "error",
  draggable: true
});
} 

export default errorAlert;