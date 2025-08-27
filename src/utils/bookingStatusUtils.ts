import { BookingStatus } from "@/enum/BookingStatus";

export const convertBookingStatus = (status: BookingStatus): string => {
    switch (status) {
        case BookingStatus.PendingForPayment:
            return 'รอการชำระเงิน';
        case BookingStatus.Success:
            return 'สำเร็จ';
        case BookingStatus.Cancelled:
            return 'ยกเลิก';
        case BookingStatus.Terminated:
            return 'สิ้นสุด';
        default:
            return status;
    }
};

export const getBookingStatusColor = (status: BookingStatus): string => {
    switch (status) {
        case BookingStatus.PendingForPayment:
            return 'bg-yellow-100 text-yellow-800';
        case BookingStatus.Success:
            return 'bg-blue-100 text-blue-800';
        case BookingStatus.Cancelled:
            return 'bg-red-100 text-red-800';
        case BookingStatus.Terminated:
            return 'bg-gray-100 text-gray-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const getBookingStatusDisplay = (status: BookingStatus) => {
    return {
        text: convertBookingStatus(status),
        className: getBookingStatusColor(status)
    };
};
