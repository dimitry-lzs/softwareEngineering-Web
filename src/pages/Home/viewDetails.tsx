import { useState } from "react";
import { useNavigate } from "react-router";

import BookingLayout from "../../components/BookingLayout";
import AppointmentBookingForm from "../../components/AppointmentBookingForm";
import AppointmentActions from "../../components/AppointmentActions";
import { useCreateAppointment } from "../../hooks";
import { AppointmentStatus } from "../../types";

export default function ViewDetails({
    id,
    setPage,
}: {
    id: string;
    setPage: (page: number) => void;
}) {
    const { createAppointment } = useCreateAppointment();
    const [selected, setSelected] = useState<number | null>(null);
    const [reason, setReason] = useState<string>('');
    const navigate = useNavigate();

    const submitHandler = async () => {
        if (!selected) {
            return;
        }
        try {
            await createAppointment({
                doctorID: id,
                slotID: selected,
                reason: reason,
                status: AppointmentStatus.Pending,
            });
            navigate('/home');
        } catch (error) {
            console.error("Failed to book appointment:", error);
        }
    }

    const handleBack = () => {
        setPage(1);
    };

    return (
        <BookingLayout title="Book Appointment" subtitle="Book your appointment!">
            <AppointmentBookingForm
                doctorId={id}
                reason={reason}
                setReason={setReason}
                selectedSlot={selected}
                setSelectedSlot={setSelected}
                actions={
                    <AppointmentActions
                        onBack={handleBack}
                        onSubmit={submitHandler}
                        submitLabel="Book Appointment"
                        canProceed={!!selected}
                        showBack={true}
                        showSubmit={true}
                    />
                }
            />
        </BookingLayout>
    );
}