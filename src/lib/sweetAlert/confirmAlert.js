import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../../style/globals.css'

export const confirmAction = async (title = "Are you sure?", text = "You won't be able to revert this!") => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: "question",
    position: 'center',
    showCancelButton: true,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    confirmButtonColor: "#BC105C",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Updated",
    cancelButtonText: "No, Cancel",
    customClass: {
      container: 'my-swal-container',
      popup: 'rounded-[2rem] shadow-2xl',
    },
  });
  return result.isConfirmed;
};

export const successAlert = (title = "Successfully!", text = "Your Profile Photos Updated") => {
Swal.fire({
    title: title,
    text: text,
    icon: "success",
    confirmButtonColor: "#BC105C",
    customClass: {
      container: 'my-swal-container',
      popup: 'rounded-[2rem] shadow-2xl border border-white/10',
    },
  });
};;

export const errorAlert = (title = "Failed!", text = "Try again!") => {
  Swal.fire({
    title: title,
    text: text,
    icon: "error",
    confirmButtonColor: "#BC105C",
    customClass: {
      container: 'my-swal-container',
      popup: 'rounded-[2rem]'
    },
  });
};