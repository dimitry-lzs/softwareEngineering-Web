import { MedicalServices, Person } from '@mui/icons-material';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    List,
    ListItem,
    ListItemDecorator,
    Option,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Typography,
} from '@mui/joy';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { notificationStore, userStore } from '../../stores';
import { OfficeLocation, Speciality, UserType } from '../../types';
import type { SignInFormElement } from '../types';

const userTypes = [
    {
        label: 'Doctor',
        value: UserType.Doctor,
        icon: <MedicalServices />,
    },
    {
        label: 'Patient',
        value: UserType.Patient,
        icon: <Person />,
    },
];

export default function SignUp() {
    const [userType, setUserType] = useState(userTypes[0].value);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
        event.preventDefault(); // This prevents the actual form submission
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());

        const registered = await userStore.register({
            ...formJson,
            userType,
        } as any);
        if (registered) {
            notificationStore.setNotification(
                true,
                'User registered successfully',
                'success',
            );
            navigate('/auth/login');
        }
    };

    return (
        <>
            <Stack sx={{ gap: 4, mb: 2 }}>
                <Stack sx={{ gap: 1 }}>
                    <Typography component='h1' level='h3'>
                        Sign Up
                    </Typography>
                    <Typography level='body-sm'>
                        Already a user? <Link to='/auth/login'>Sign In</Link>
                    </Typography>
                </Stack>
            </Stack>
            <Stack sx={{ gap: 4, mt: 2 }}>
                <RadioGroup name='userType' defaultValue={userTypes[0].value}>
                    <List
                        orientation='horizontal'
                        sx={{
                            '--List-gap': '0.5rem',
                            '--ListItem-paddingY': '1rem',
                            '--ListItem-radius': '8px',
                            '--ListItemDecorator-size': '32px',
                        }}
                    >
                        {userTypes.map((type, index) => (
                            <ListItem
                                variant='outlined'
                                key={type.value}
                                sx={{ boxShadow: 'sm' }}
                            >
                                <ListItemDecorator>
                                    {[<MedicalServices />, <Person />][index]}
                                </ListItemDecorator>
                                <Radio
                                    overlay
                                    value={type.value}
                                    label={type.label}
                                    onChange={(event) => {
                                        setUserType(
                                            event.target.value as UserType,
                                        );
                                    }}
                                    sx={{
                                        flexGrow: 1,
                                        flexDirection: 'row-reverse',
                                    }}
                                    slotProps={{
                                        action: ({ checked }) => ({
                                            sx: (theme) => ({
                                                ...(checked && {
                                                    inset: -1,
                                                    border: '2px solid',
                                                    borderColor:
                                                        theme.vars.palette
                                                            .primary[500],
                                                }),
                                            }),
                                        }),
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </RadioGroup>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <FormControl required>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' name='email' />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' name='password' />
                        </FormControl>
                        <FormControl required>
                            <FormLabel>Full Name</FormLabel>
                            <Input type='text' name='fullName' />
                        </FormControl>
                        {userType === 'DOCTOR' && (
                            <>
                                <FormControl required>
                                    <FormLabel>Specialization</FormLabel>
                                    <Select
                                        name='speciality'
                                        placeholder='Select Specialization'
                                    >
                                        {Object.keys(Speciality).map((key) => (
                                            <Option
                                                key={key}
                                                value={
                                                    Speciality[
                                                        key as keyof typeof Speciality
                                                    ]
                                                }
                                            >
                                                {
                                                    Speciality[
                                                        key as keyof typeof Speciality
                                                    ]
                                                }
                                            </Option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>License ID</FormLabel>
                                    <Input type='text' name='licenceID' />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Office Location</FormLabel>
                                    <Select
                                        name='officeLocation'
                                        placeholder='Select Office Location'
                                    >
                                        {Object.keys(OfficeLocation).map(
                                            (key) => (
                                                <Option
                                                    key={key}
                                                    value={
                                                        OfficeLocation[
                                                            key as keyof typeof OfficeLocation
                                                        ]
                                                    }
                                                >
                                                    {key}
                                                </Option>
                                            ),
                                        )}
                                    </Select>
                                </FormControl>
                            </>
                        )}
                        {userType === 'PATIENT' && (
                            <FormControl required>
                                <FormLabel>AMKA</FormLabel>
                                <Input type='text' name='amka' />
                            </FormControl>
                        )}
                        <Stack sx={{ gap: 4, mt: 2 }}>
                            <Button type='submit' fullWidth>
                                Create Account
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Stack>
        </>
    );
}
