import { Box, Typography, Container, Divider, Card, List, ListItem, ListItemContent, ListItemDecorator } from '@mui/joy';
import { Gavel, Security, HealthAndSafety, Payment, Cancel, ContactSupport } from '@mui/icons-material';

export default function TermsAndConditions() {
    return (
        <Container maxWidth="md" sx={{ py: 6, px: { xs: 2, md: 4 } }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography level="h1" sx={{ fontSize: '2.5rem', fontWeight: 'bold', mb: 2 }}>Terms and Conditions</Typography>
                <Typography level="body-lg" color="neutral">
                    Last Updated: May 26, 2026
                </Typography>
            </Box>

            <Card variant="outlined" sx={{ p: 0, overflow: 'hidden', boxShadow: 'sm' }}>
                <Box sx={{ p: { xs: 3, md: 5 } }}>
                    <Typography level="body-md" sx={{ mb: 4, lineHeight: 1.7 }}>
                        Welcome to MediQ. These Terms and Conditions ("Terms") govern your access to and use of the MediQ application, website, and services (collectively, the "Platform"). By creating an account or using our Platform, you agree to be bound by these Terms. If you do not agree, please do not use our services.
                    </Typography>

                    {/* Section 1 */}
                    <Box sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <HealthAndSafety color="primary" sx={{ mr: 1.5, fontSize: '1.8rem' }} />
                            <Typography level="h3" sx={{ m: 0 }}>1. Nature of the Service</Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Typography level="body-md" sx={{ mb: 2, lineHeight: 1.7 }}>
                            MediQ is a digital healthcare facilitation platform that connects patients with licensed medical professionals. <strong>MediQ does not provide medical advice, diagnosis, or treatment.</strong> All medical services are provided directly by independent, licensed healthcare professionals registered on the platform.
                        </Typography>
                        <List marker="disc" size="sm" sx={{ ml: 3 }}>
                            <ListItem>
                                <ListItemContent>The Platform should never be used for medical emergencies. In an emergency, dial your local emergency services (e.g., 911 or 112) immediately.</ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent>Any AI-generated insights or summaries provided by the platform are for informational purposes only and must not be interpreted as medical advice.</ListItemContent>
                            </ListItem>
                        </List>
                    </Box>

                    {/* Section 2 */}
                    <Box sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Security color="primary" sx={{ mr: 1.5, fontSize: '1.8rem' }} />
                            <Typography level="h3" sx={{ m: 0 }}>2. User Accounts & Security</Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Typography level="body-md" sx={{ mb: 2, lineHeight: 1.7 }}>
                            To access most features, you must register for an account as either a Patient or a Doctor. You are solely responsible for maintaining the confidentiality of your login credentials.
                        </Typography>
                        <Typography level="body-md" sx={{ lineHeight: 1.7 }}>
                            Doctors are strictly vetted. Misrepresenting medical credentials, licensing, or practice location is a violation of these Terms and may result in immediate account termination and legal reporting. Patients agree to provide accurate medical history and personal information.
                        </Typography>
                    </Box>

                    {/* Section 3 */}
                    <Box sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Cancel color="primary" sx={{ mr: 1.5, fontSize: '1.8rem' }} />
                            <Typography level="h3" sx={{ m: 0 }}>3. Cancellations and No-Shows</Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Typography level="body-md" sx={{ mb: 2, lineHeight: 1.7 }}>
                            <strong>For Patients:</strong> Appointments can be canceled free of charge up to 24 hours prior to the scheduled time. Cancellations made within 24 hours may be subject to a late-cancellation fee up to 50% of the consultation cost.
                        </Typography>
                        <Typography level="body-md" sx={{ lineHeight: 1.7 }}>
                            <strong>For Doctors:</strong> Excessive cancellations or failure to attend confirmed appointments ("No-Shows") will negatively impact your platform rating and may lead to temporary or permanent suspension from MediQ.
                        </Typography>
                    </Box>

                    {/* Section 4 */}
                    <Box sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Gavel color="primary" sx={{ mr: 1.5, fontSize: '1.8rem' }} />
                            <Typography level="h3" sx={{ m: 0 }}>4. Limitation of Liability</Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Typography level="body-md" sx={{ lineHeight: 1.7 }}>
                            To the maximum extent permitted by law, MediQ, its affiliates, directors, and employees shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from (a) your use or inability to use the Platform; (b) the medical services provided by Doctors; or (c) unauthorized access, use, or alteration of your transmissions or content.
                        </Typography>
                    </Box>

                    {/* Section 5 */}
                    <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <ContactSupport color="primary" sx={{ mr: 1.5, fontSize: '1.8rem' }} />
                            <Typography level="h3" sx={{ m: 0 }}>5. Contact Us</Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Typography level="body-md" sx={{ lineHeight: 1.7 }}>
                            If you have any questions about these Terms, please contact our legal team at <strong>legal@mediq.com</strong> or via the platform's support portal.
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Container>
    );
}
