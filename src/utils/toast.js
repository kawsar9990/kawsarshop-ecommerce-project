import { toast } from 'react-toastify';

const notify = {
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
  info: (msg) => toast.info(msg),
  warning: (msg) => toast.warning(msg),
};

export default notify;