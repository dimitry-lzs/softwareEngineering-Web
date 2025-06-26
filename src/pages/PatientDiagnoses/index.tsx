import { useState } from 'react';
import {
    Box,
    Card,
    Stack,
    Typography,
    Divider,
    Button,
    CircularProgress,
    Chip
} from '@mui/joy';
import { AutoAwesome, MedicalServices, Assignment } from '@mui/icons-material';

import SectionTitle from '../../components/SectionTitle';
import { usePatientDiagnoses } from '../../hooks/patient';
import { useSummary } from '../../hooks/summary';

export default function PatientDiagnoses() {
    const { diagnoses, loading: diagnosesLoading } = usePatientDiagnoses();
    const { generatePatientRoast } = useSummary();

    const [aiInsight, setAiInsight] = useState<string>('');
    const [loadingInsight, setLoadingInsight] = useState(false);

    const generateInsight = async () => {
        if (!diagnoses || diagnoses.length === 0) return;

        setLoadingInsight(true);
        try {
            // Create diagnosis pairs for the AI function
            const diagnosisPairs: [string, string][] = diagnoses.map((diagnosis) => [
                diagnosis.decease,
                diagnosis.details
            ]);

            const response = await generatePatientRoast(diagnosisPairs);

            // Extract the insight from the response
            const insightText = response?.choices?.[0]?.message?.content || 'No insight generated';
            setAiInsight(insightText);
        } catch (error) {
            console.error('Failed to generate insight:', error);
            setAiInsight('AI is taking a sick day... ironically! 😷');
        } finally {
            setLoadingInsight(false);
        }
    };

    const totalDiagnoses = diagnoses?.length || 0;

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <SectionTitle
                title="My Medical History"
                subtitle="Your diagnoses and medical insights from appointments"
            />

            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '900px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                {/* Medical Overview Card */}
                <Card
                    variant="outlined"
                    sx={{
                        background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.05) 0%, rgba(76, 175, 80, 0.02) 100%)',
                        border: '1px solid',
                        borderColor: 'success.200'
                    }}
                >
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Box sx={{ textAlign: 'center' }}>
                            <MedicalServices
                                sx={{
                                    fontSize: '3.5rem',
                                    color: 'success.600',
                                    mb: 1
                                }}
                            />
                            <Typography level="h2" sx={{ fontSize: '2rem', fontWeight: 'bold', color: 'success.600' }}>
                                {totalDiagnoses}
                            </Typography>
                            <Typography level="body-sm" color="neutral">
                                Total diagnos{totalDiagnoses !== 1 ? 'es' : 'is'}
                            </Typography>
                        </Box>

                        <Divider orientation="vertical" />

                        <Box sx={{ flex: 1 }}>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                <Typography level="title-lg">AI Health Insights</Typography>
                                <Button
                                    size="sm"
                                    variant="soft"
                                    color="success"
                                    startDecorator={<AutoAwesome />}
                                    onClick={generateInsight}
                                    loading={loadingInsight}
                                    disabled={!diagnoses || diagnoses.length === 0}
                                >
                                    {aiInsight ? 'Generate New' : 'Generate Insight'}
                                </Button>
                            </Stack>

                            {aiInsight ? (
                                <Card
                                    variant="soft"
                                    color="success"
                                    sx={{
                                        background: (theme) => theme.palette.mode === 'dark'
                                            ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(129, 199, 132, 0.08) 100%)'
                                            : 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(129, 199, 132, 0.05) 100%)',
                                        border: '1px dashed',
                                        borderColor: (theme) => theme.palette.mode === 'dark'
                                            ? 'success.400'
                                            : 'success.300'
                                    }}
                                >
                                    <Typography
                                        level="body-md"
                                        sx={{
                                            fontStyle: 'italic',
                                            color: (theme) => theme.palette.mode === 'dark'
                                                ? 'success.300'
                                                : 'success.700'
                                        }}
                                    >
                                        "{aiInsight}"
                                    </Typography>
                                </Card>
                            ) : (
                                <Typography level="body-sm" color="neutral">
                                    {diagnoses && diagnoses.length > 0
                                        ? 'Click "Generate Insight" for an AI-powered analysis of your medical history!'
                                        : 'No diagnoses yet to analyze! 🏥'
                                    }
                                </Typography>
                            )}
                        </Box>
                    </Stack>
                </Card>

                {/* Diagnoses List */}
                <Card>
                    <Box sx={{ mb: 2 }}>
                        <Typography level="title-md">Medical Diagnoses</Typography>
                        <Typography level="body-sm" color="neutral">
                            Detailed medical findings from your appointments
                        </Typography>
                    </Box>
                    <Divider />

                    {diagnosesLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress size="md" />
                        </Box>
                    ) : !diagnoses || diagnoses.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 6 }}>
                            <Typography level="body-lg" color="neutral">
                                No diagnoses recorded yet
                            </Typography>
                            <Typography level="body-sm" color="neutral" sx={{ mt: 1 }}>
                                Complete more appointments to build your medical history
                            </Typography>
                        </Box>
                    ) : (
                        <Stack spacing={0} divider={<Divider />}>
                            {diagnoses.map((diagnosis, index) => (
                                <Box key={diagnosis.appointmentid || index} sx={{ py: 3 }}>
                                    <Stack direction="row" spacing={2}>
                                        <Box
                                            sx={{
                                                flexShrink: 0,
                                                width: 48,
                                                height: 48,
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Assignment sx={{ color: 'white', fontSize: '1.5rem' }} />
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                                                <Typography level="title-md" sx={{ fontWeight: 'bold' }}>
                                                    {diagnosis.decease}
                                                </Typography>
                                                <Chip
                                                    size="sm"
                                                    variant="soft"
                                                    color="primary"
                                                    startDecorator={<Assignment fontSize="inherit" />}
                                                >
                                                    Appointment #{diagnosis.appointmentid}
                                                </Chip>
                                            </Stack>

                                            {diagnosis.details && (
                                                <Typography level="body-md" sx={{ lineHeight: 1.6, color: 'neutral.700' }}>
                                                    {diagnosis.details}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Stack>
                                </Box>
                            ))}
                        </Stack>
                    )}
                </Card>
            </Stack>
        </Box>
    );
}
