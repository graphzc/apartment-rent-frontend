import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface IAlert {
    title: string;
    text?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export const successAlert = async ({
    title,
    text,
    confirmButtonText = "OK",
    cancelButtonText,
    onConfirm,
    onCancel,
}: IAlert) => {
    const result = await MySwal.fire({
        icon: 'success',
        title,
        text,
        showCancelButton: cancelButtonText !== undefined? true : false,
        confirmButtonText: confirmButtonText,
    });
    if (result.isConfirmed) {
        onConfirm && onConfirm();
    } else {
        onCancel && onCancel();
    }
}

export const errorAlert = async ({
    title,
    text,
    confirmButtonText = "OK",
    cancelButtonText,
    onConfirm,
    onCancel,
}: IAlert) => {
    const result = await MySwal.fire({
        icon: 'error',
        title,
        text,
        showCancelButton: cancelButtonText !== undefined? true : false,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
    });
    if (result.isConfirmed) {
        onConfirm && onConfirm();
    } else {
        onCancel && onCancel();
    }
}

export const warningAlert = async ({
    title,
    text,
    confirmButtonText = "OK",
    cancelButtonText,
    onConfirm,
    onCancel,
}: IAlert) => {
    const result = await MySwal.fire({
        icon: 'warning',
        title,
        text,
        showCancelButton: cancelButtonText !== undefined? true : false,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
    });
    if (result.isConfirmed) {
        onConfirm && onConfirm();
    } else {
        onCancel && onCancel();
    }
}
export default MySwal;
