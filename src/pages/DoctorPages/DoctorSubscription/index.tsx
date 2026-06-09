import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardOverflow,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemDecorator,
    Modal,
    ModalClose,
    ModalDialog,
    Stack,
    Typography,
} from '@mui/joy';
import {
    Autorenew,
    CalendarMonth,
    Cancel,
    Check,
    CreditCard,
    Info,
    Percent,
    Star,
    Verified,
    WorkspacePremium,
} from '@mui/icons-material';
import SectionTitle from '../../../components/SectionTitle';
import { subscriptionStore } from '../../../stores';
import { SubscriptionPlan } from '../../../types';

const PLANS = [
    {
        type: SubscriptionPlan.Monthly,
        name: 'Monthly',
        price: '€29.99',
        period: '/month',
        commission: '5%',
        commissionLabel: 'per appointment',
        features: [
            'Full access to all doctor features',
            'Set unlimited availabilities',
            'View & manage appointments',
            'Access patient history & diagnoses',
            'Receive patient ratings & reviews',
            'Priority support',
        ],
        highlight: false,
        badge: '',
    },
    {
        type: SubscriptionPlan.Yearly,
        name: 'Yearly',
        price: '€249.99',
        period: '/year',
        commission: '3%',
        commissionLabel: 'per appointment',
        features: [
            'Everything in Monthly',
            'Save ~30% compared to monthly',
            'Lower commission rate (3% vs 5%)',
            'Annual performance analytics',
            'Featured doctor badge on profile',
            'Priority support',
        ],
        highlight: true,
        badge: 'Best Value',
    },
];

function DoctorSubscription() {
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);

    useEffect(() => {
        subscriptionStore.fetchSubscription();
    }, []);

    const handleSubscribe = (plan: SubscriptionPlan) => {
        setSelectedPlan(plan);
        setConfirmModalOpen(true);
    };

    const confirmSubscribe = async () => {
        if (selectedPlan) {
            const success = await subscriptionStore.subscribe(selectedPlan);
            if (success) {
                setConfirmModalOpen(false);
                setSelectedPlan(null);
            }
        }
    };

    const handleCancelRenewal = async () => {
        const success = await subscriptionStore.cancelRenewal();
        if (success) {
            setCancelModalOpen(false);
        }
    };

    const subscription = subscriptionStore.currentSubscription;

    const formatDate = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <SectionTitle
                title="Subscription"
                subtitle="Manage your subscription plan and view pricing"
            />

            <Stack
                spacing={4}
                sx={{
                    maxWidth: '1000px',
                    mx: 'auto',
                    px: { xs: 2, md: 4 },
                    py: { xs: 2, md: 3 },
                }}
            >
                {/* Current Subscription Status */}
                {subscription && (
                    <Card
                        variant="soft"
                        color="success"
                        sx={{
                            p: 3,
                            background: (theme) =>
                                `linear-gradient(135deg, ${theme.vars.palette.success.softBg}, ${theme.vars.palette.success.softHoverBg})`,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                            <Verified sx={{ fontSize: '2rem' }} color="success" />
                            <Typography level="h3" sx={{ m: 0 }}>
                                Active Subscription
                            </Typography>
                            <Chip
                                size="sm"
                                variant="solid"
                                color="success"
                                sx={{ ml: 'auto', fontWeight: 'bold' }}
                            >
                                {subscription.plan === SubscriptionPlan.Monthly ? 'Monthly' : 'Yearly'}
                            </Chip>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Stack spacing={1.5} sx={{ mt: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CalendarMonth fontSize="small" />
                                <Typography level="body-md">
                                    <strong>Start Date:</strong> {formatDate(subscription.startDate)}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CalendarMonth fontSize="small" />
                                <Typography level="body-md">
                                    <strong>End Date:</strong> {formatDate(subscription.endDate)}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Autorenew fontSize="small" />
                                <Typography level="body-md">
                                    <strong>Auto-Renewal:</strong>{' '}
                                    {subscription.autoRenew ? (
                                        <Chip size="sm" color="primary" variant="soft">
                                            Enabled
                                        </Chip>
                                    ) : (
                                        <Chip size="sm" color="neutral" variant="soft">
                                            Disabled
                                        </Chip>
                                    )}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Percent fontSize="small" />
                                <Typography level="body-md">
                                    <strong>Commission Rate:</strong>{' '}
                                    {subscription.plan === SubscriptionPlan.Monthly ? '5%' : '3%'} per
                                    appointment
                                </Typography>
                            </Box>
                        </Stack>
                        {subscription.autoRenew && (
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    color="danger"
                                    size="sm"
                                    startDecorator={<Cancel />}
                                    onClick={() => setCancelModalOpen(true)}
                                    loading={subscriptionStore.isLoading}
                                >
                                    Cancel Auto-Renewal
                                </Button>
                            </Box>
                        )}
                    </Card>
                )}

                {/* Policy Section */}
                <Card variant="outlined" sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                        <Info sx={{ fontSize: '1.8rem' }} color="primary" />
                        <Typography level="h3" sx={{ m: 0 }}>
                            Subscription & Commission Policy
                        </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Stack spacing={2}>
                        <Typography level="body-md" sx={{ lineHeight: 1.7 }}>
                            MedIQ requires all doctors to maintain an active subscription to access the
                            full suite of platform features. This includes managing availabilities,
                            viewing and handling appointments, issuing diagnoses, and receiving patient
                            reviews.
                        </Typography>
                        <Typography level="body-md" sx={{ lineHeight: 1.7 }}>
                            <strong>Commission Policy:</strong> In addition to the subscription fee, a
                            small commission is charged per completed appointment. The commission rate
                            depends on your subscription plan:
                        </Typography>
                        <List marker="disc" size="sm" sx={{ ml: 3 }}>
                            <ListItem>
                                <Typography level="body-md">
                                    <strong>Monthly Plan:</strong> 5% commission per completed appointment
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography level="body-md">
                                    <strong>Yearly Plan:</strong> 3% commission per completed appointment
                                    (lower rate as a reward for annual commitment)
                                </Typography>
                            </ListItem>
                        </List>
                        <Typography level="body-md" sx={{ lineHeight: 1.7 }}>
                            <strong>Auto-Renewal:</strong> Subscriptions renew automatically at the end of
                            each billing period. You can cancel auto-renewal at any time from this page —
                            your subscription will remain active until the end date, but will not renew
                            after that.
                        </Typography>
                        <Typography level="body-sm" color="neutral" sx={{ lineHeight: 1.7, mt: 1 }}>
                            <em>
                                Note: This is a demo environment. No real payments are processed. Clicking
                                "Subscribe" will instantly activate your subscription for demonstration
                                purposes.
                            </em>
                        </Typography>
                    </Stack>
                </Card>

                {/* Pricing Cards */}
                {!subscription && (
                    <>
                        <Typography level="h3" sx={{ textAlign: 'center', mt: 2 }}>
                            Choose Your Plan
                        </Typography>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={3}
                            sx={{ justifyContent: 'center', alignItems: 'stretch' }}
                        >
                            {PLANS.map((plan) => (
                                <Card
                                    key={plan.type}
                                    variant={plan.highlight ? 'solid' : 'outlined'}
                                    color={plan.highlight ? 'primary' : undefined}
                                    invertedColors={plan.highlight}
                                    sx={{
                                        flex: 1,
                                        maxWidth: '450px',
                                        minWidth: '300px',
                                        position: 'relative',
                                        overflow: 'visible',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 'lg',
                                        },
                                    }}
                                >
                                    {plan.badge && (
                                        <Chip
                                            size="sm"
                                            variant="solid"
                                            color="warning"
                                            startDecorator={<Star fontSize="small" />}
                                            sx={{
                                                position: 'absolute',
                                                top: -12,
                                                right: 16,
                                                fontWeight: 'bold',
                                                boxShadow: 'sm',
                                            }}
                                        >
                                            {plan.badge}
                                        </Chip>
                                    )}
                                    <Box sx={{ p: 2, textAlign: 'center' }}>
                                        <WorkspacePremium sx={{ fontSize: '2.5rem', mb: 1 }} />
                                        <Typography level="h2" sx={{ mb: 0.5 }}>
                                            {plan.name}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'baseline',
                                                justifyContent: 'center',
                                                gap: 0.5,
                                                my: 2,
                                            }}
                                        >
                                            <Typography level="h1" sx={{ fontSize: '2.5rem', fontWeight: 800 }}>
                                                {plan.price}
                                            </Typography>
                                            <Typography level="body-md">{plan.period}</Typography>
                                        </Box>
                                        <Chip
                                            size="sm"
                                            variant="soft"
                                            startDecorator={<Percent fontSize="small" />}
                                        >
                                            {plan.commission} commission {plan.commissionLabel}
                                        </Chip>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ p: 2 }}>
                                        <List size="sm" sx={{ gap: 1 }}>
                                            {plan.features.map((feature, idx) => (
                                                <ListItem key={idx}>
                                                    <ListItemDecorator>
                                                        <Check
                                                            fontSize="small"
                                                            color={plan.highlight ? 'inherit' : 'success'}
                                                        />
                                                    </ListItemDecorator>
                                                    <Typography level="body-sm">{feature}</Typography>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                    <CardOverflow>
                                        <CardActions sx={{ p: 2 }}>
                                            <Button
                                                variant={plan.highlight ? 'soft' : 'solid'}
                                                color={plan.highlight ? undefined : 'primary'}
                                                size="lg"
                                                fullWidth
                                                startDecorator={<CreditCard />}
                                                loading={subscriptionStore.isLoading}
                                                onClick={() => handleSubscribe(plan.type)}
                                                sx={{
                                                    fontWeight: 'bold',
                                                    fontSize: '1rem',
                                                }}
                                            >
                                                Subscribe to {plan.name}
                                            </Button>
                                        </CardActions>
                                    </CardOverflow>
                                </Card>
                            ))}
                        </Stack>
                    </>
                )}
            </Stack>

            {/* Confirm Subscribe Modal */}
            <Modal open={confirmModalOpen} onClose={() => setConfirmModalOpen(false)}>
                <ModalDialog variant="outlined" sx={{ maxWidth: 420 }}>
                    <ModalClose />
                    <Typography level="h4" sx={{ mb: 1 }}>
                        Confirm Subscription
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography level="body-md" sx={{ mb: 2 }}>
                        You are about to subscribe to the{' '}
                        <strong>
                            {selectedPlan === SubscriptionPlan.Monthly ? 'Monthly (€29.99/mo)' : 'Yearly (€249.99/yr)'}
                        </strong>{' '}
                        plan.
                    </Typography>
                    <Typography level="body-sm" color="neutral" sx={{ mb: 2 }}>
                        This is a demo — no real payment will be processed. Your subscription will be
                        activated instantly.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            color="neutral"
                            onClick={() => setConfirmModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="solid"
                            color="primary"
                            loading={subscriptionStore.isLoading}
                            onClick={confirmSubscribe}
                        >
                            Confirm & Subscribe
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>

            {/* Cancel Renewal Modal */}
            <Modal open={cancelModalOpen} onClose={() => setCancelModalOpen(false)}>
                <ModalDialog variant="outlined" sx={{ maxWidth: 420 }}>
                    <ModalClose />
                    <Typography level="h4" sx={{ mb: 1 }}>
                        Cancel Auto-Renewal
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography level="body-md" sx={{ mb: 2 }}>
                        Are you sure you want to cancel auto-renewal? Your subscription will remain
                        active until{' '}
                        <strong>{subscription ? formatDate(subscription.endDate) : 'the end date'}</strong>,
                        but will not renew after that.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            color="neutral"
                            onClick={() => setCancelModalOpen(false)}
                        >
                            Keep Subscription
                        </Button>
                        <Button
                            variant="solid"
                            color="danger"
                            loading={subscriptionStore.isLoading}
                            onClick={handleCancelRenewal}
                        >
                            Cancel Renewal
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </Box>
    );
}

export default observer(DoctorSubscription);
