import Button from '@mui/joy/Button';

interface AppointmentActionsProps {
    onBack?: () => void;
    onNext?: () => void;
    onSubmit?: () => void;
    backLabel?: string;
    nextLabel?: string;
    submitLabel?: string;
    canProceed?: boolean;
    showBack?: boolean;
    showNext?: boolean;
    showSubmit?: boolean;
}

export default function AppointmentActions({
    onBack,
    onNext,
    onSubmit,
    backLabel = "Back",
    nextLabel = "Continue",
    submitLabel = "Book Appointment",
    canProceed = true,
    showBack = true,
    showNext = false,
    showSubmit = false,
}: AppointmentActionsProps) {
    return (
        <>
            {showBack && onBack && (
                <Button
                    size="sm"
                    variant="outlined"
                    onClick={onBack}
                >
                    {backLabel}
                </Button>
            )}
            {showNext && onNext && (
                <Button
                    size="sm"
                    variant="solid"
                    onClick={onNext}
                >
                    {nextLabel}
                </Button>
            )}
            {showSubmit && onSubmit && (
                <Button
                    size="sm"
                    variant="solid"
                    onClick={onSubmit}
                    disabled={!canProceed}
                >
                    {submitLabel}
                </Button>
            )}
        </>
    );
}
