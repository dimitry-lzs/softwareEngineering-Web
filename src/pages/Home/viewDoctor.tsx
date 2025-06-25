import { useNavigate } from 'react-router';

import BookingLayout from '../../components/BookingLayout';
import DoctorInfoCard from '../../components/DoctorInfoCard';
import DoctorTabs from '../../components/DoctorTabs';
import AppointmentActions from '../../components/AppointmentActions';
import { useDoctor, useDoctorRatings } from '../../hooks';

export default function ViewDoctor({
    id,
    setPage,
}: {
    id: string;
    setPage: (page: number) => void;
}) {
    const { doctor } = useDoctor(id);
    const { ratings } = useDoctorRatings(id);
    const navigate = useNavigate();

    const handleReturnToSearch = () => {
        navigate('/home');
    };

    const handleContinue = () => {
        setPage(2);
    };

    return (
        <BookingLayout title="Book Appointment" subtitle="Book your appointment!">
            <DoctorInfoCard
                doctor={doctor}
                actions={
                    <AppointmentActions
                        onBack={handleReturnToSearch}
                        onNext={handleContinue}
                        backLabel="Return to search"
                        nextLabel="Continue"
                        showBack={true}
                        showNext={true}
                    />
                }
            >
                <DoctorTabs doctor={doctor} ratings={ratings} />
            </DoctorInfoCard>
        </BookingLayout>
    );
}