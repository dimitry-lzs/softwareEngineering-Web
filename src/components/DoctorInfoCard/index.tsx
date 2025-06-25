import * as React from 'react';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

import Rating from '../../pages/Home/rating';
import SmartAvatar from '../SmartAvatar';
import formatString from '../../misc/formatSpeciality';
import { Doctor } from '../../types';
import { LowercaseType } from '../../hooks/lowercase';

interface DoctorInfoCardProps {
    doctor: LowercaseType<Doctor> | null | undefined;
    children?: React.ReactNode;
    actions?: React.ReactNode;
}

export default function DoctorInfoCard({ doctor, children, actions }: DoctorInfoCardProps) {
    return (
        <Card>
            <Box sx={{ mb: 0.5 }}>
                <Typography level="title-md">Doctor Details</Typography>
            </Box>
            <Divider />
            <Stack
                direction="column"
                spacing={2}
                sx={{ display: 'flex', my: 1 }}
            >
                <Stack direction="row" spacing={2} px={1}>
                    <Box
                        sx={{
                            width: 108,
                            height: 108,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            flexShrink: 0,
                        }}
                    >
                        <SmartAvatar
                            src={doctor?.avatar}
                            name={doctor?.fullname || 'Doctor'}
                            sx={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 0,
                            }}
                        />
                    </Box>
                    <Stack direction="column" spacing={0.5} sx={{ flexGrow: 1 }}>
                        <Stack gap={0} pl={2}>
                            <FormControl>
                                <FormLabel>
                                    <Typography level="h4">
                                        {doctor?.fullname}
                                    </Typography>
                                </FormLabel>
                            </FormControl>
                            <FormControl>
                                <FormLabel>
                                    <Typography level="title-lg">
                                        {formatString(doctor?.speciality ?? '')}
                                    </Typography>
                                </FormLabel>
                            </FormControl>
                        </Stack>
                        <Stack gap={0} pl={2}>
                            <FormControl>
                                <FormLabel>Email: {doctor?.email}</FormLabel>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Phone: {doctor?.phone}</FormLabel>
                            </FormControl>
                        </Stack>
                    </Stack>
                    <Stack direction="row"
                        alignItems="flex-start"
                        justifyContent="flex-end"
                        pr={1}
                    >
                        <Rating rating={doctor?.rating ?? 0} />
                    </Stack>
                </Stack>
            </Stack>
            {children}
            {actions && (
                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                        {actions}
                    </CardActions>
                </CardOverflow>
            )}
        </Card>
    );
}
