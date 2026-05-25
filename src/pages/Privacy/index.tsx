import { Box, Typography, Container, Divider, Card, List, ListItem, ListItemContent } from '@mui/joy';
import { Policy, Visibility, EnhancedEncryption, Share, DeleteForever, Update } from '@mui/icons-material';

export default function PrivacyPolicy() {
    return (
        <Container maxWidth="md" sx={{ py: 6, px: { xs: 2, md: 4 } }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography level="h1" sx={{ fontSize: '2.5rem', fontWeight: 'bold', mb: 2 }}>Privacy Policy</Typography>
                <Typography level="body-lg" color="neutral">
                    Last Updated: May 26, 2026
                </Typography>
            </Box>

            <Card variant="outlined" sx={{ p: 0, overflow: 'hidden', boxShadow: 'sm' }}>
                <Box sx={{ p: { xs: 3, md: 5 } }}>
                    <Typography level="body-md" sx={{ mb: 4, lineHeight: 1.7 }}>
                        At MediQ, your privacy and the security of your medical data are our highest priorities. This Privacy Policy outlines how we collect, use, protect, and handle your Personal Identifiable Information (PII) and Protected Health Information (PHI) in accordance with the General Data Protection Regulation (GDPR) and the European Health Data Space framework.
                    </Typography>

                    {/* Section 1 */}
                    <Box sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Visibility color="primary" sx={{ mr: 1.5, fontSize: '1.8rem' }} />
                            <Typography level="h3" sx={{ m: 0 }}>1. Data We Collect</Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Typography level="body-md" sx={{ mb: 2, lineHeight: 1.7 }}>
                            We collect data that you provide directly to us when creating an account, booking an appointment, or using our services. This includes:
                        </Typography>
                        <List marker="disc" size="sm" sx={{ ml: 3, mb: 2 }}>
                            <ListItem>
                                <ListItemContent><strong>Identity Data:</strong> Full name, email address, phone number.</ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent><strong>Authentication Data:</strong> Securely hashed passwords (BCrypt).</ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent><strong>Sensitive Data (Patients):</strong> National identification numbers (AMKA), appointment history, and medical diagnoses entered by your doctors.</ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent><strong>Professional Data (Doctors):</strong> Medical license IDs, specialities, practice locations, and biographies.</ListItemContent>
                            </ListItem>
                        </List>
                    </Box>

                    {/* Section 2 */}
                    <Box sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <EnhancedEncryption color="primary" sx={{ mr: 1.5, fontSize: '1.8rem' }} />
                            <Typography level="h3" sx={{ m: 0 }}>2. How We Protect Your Data</Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Typography level="body-md" sx={{ mb: 2, lineHeight: 1.7 }}>
                            We implement state-of-the-art security measures to maintain the safety of your personal information. MediQ employs strict cryptography protocols for data at rest and data in transit.
                        </Typography>
                        <List marker="circle" size="sm" sx={{ ml: 3 }}>
                            <ListItem>
                                <ListItemContent><strong>End-to-End Encryption:</strong> All sensitive medical records (diagnoses) and national identifiers (AMKA) are encrypted at rest using AES-256-GCM.</ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent><strong>Audit Logging:</strong> All critical account actions (logins, profile updates, account deletions) are logged securely to comply with the NIS2 directive.</ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent><strong>Access Control:</strong> Zero-trust architecture ensures that users can only access their own appointments and records.</ListItemContent>
                            </ListItem>
                        </List>
                    </Box>

                    {/* Section 3 */}
                    <Box sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Share color="primary" sx={{ mr: 1.5, fontSize: '1.8rem' }} />
                            <Typography level="h3" sx={{ m: 0 }}>3. Information Sharing</Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Typography level="body-md" sx={{ mb: 2, lineHeight: 1.7 }}>
                            We do not sell, trade, or otherwise transfer your Personal Identifiable Information to outside parties without your consent. We may share data with:
                        </Typography>
                        <List marker="disc" size="sm" sx={{ ml: 3 }}>
                            <ListItem>
                                <ListItemContent><strong>Healthcare Providers:</strong> Only the specific doctor you book an appointment with will have access to your relevant medical history for that session.</ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent><strong>AI Partners:</strong> When you request an AI insight, anonymized text is securely transmitted to our AI provider. The provider does not retain this data for model training.</ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent><strong>Legal Authorities:</strong> When required by law to comply with a subpoena or similar legal process.</ListItemContent>
                            </ListItem>
                        </List>
                    </Box>

                    {/* Section 4 */}
                    <Box sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <DeleteForever color="primary" sx={{ mr: 1.5, fontSize: '1.8rem' }} />
                            <Typography level="h3" sx={{ m: 0 }}>4. Your Rights (GDPR)</Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Typography level="body-md" sx={{ mb: 2, lineHeight: 1.7 }}>
                            Under the GDPR, you have the right to access, rectify, port, and erase your data. 
                        </Typography>
                        <List marker="disc" size="sm" sx={{ ml: 3 }}>
                            <ListItem>
                                <ListItemContent><strong>Right to Portability:</strong> You can download a full JSON export of your personal data at any time via your Profile Settings.</ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent><strong>Right to Erasure ("Right to be Forgotten"):</strong> You can permanently delete your account and all associated data via your Profile Settings. This action is irreversible.</ListItemContent>
                            </ListItem>
                        </List>
                    </Box>

                    {/* Section 5 */}
                    <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Update color="primary" sx={{ mr: 1.5, fontSize: '1.8rem' }} />
                            <Typography level="h3" sx={{ m: 0 }}>5. Policy Updates</Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Typography level="body-md" sx={{ lineHeight: 1.7 }}>
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. If you have any concerns regarding your privacy, please contact our Data Protection Officer at <strong>dpo@mediq.com</strong>.
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Container>
    );
}
