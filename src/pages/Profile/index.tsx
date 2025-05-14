import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Phone from '@mui/icons-material/PhoneRounded';
import NumbersIcon from '@mui/icons-material/Numbers';
import { userStore } from '../../stores';
import { OfficeLocation, Speciality, UserType } from '../../stores/UserStore';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Select, Option, Textarea } from '@mui/joy';
import { useRef } from 'react';
import { PinDropRounded } from '@mui/icons-material';

export default function Profile() {
    const formRef = useRef<HTMLFormElement>(null);
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
    };
    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Box
                sx={{
                    position: 'sticky',
                    top: { sm: -100, md: -110 },
                    bgcolor: 'background.body',
                    zIndex: 9995,
                }}
            >
                <Box sx={{ px: { xs: 2, md: 6 } }}>
                    <Typography level="h3" component="h1" sx={{ mt: 1, mb: 2 }}>
                        My profile
                    </Typography>
                </Box>
            </Box>
            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '800px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 6, md: 3 },
                }}
            >
                <Card sx={{ minWidth: 620 }}>
                    <Box sx={{ mb: 1 }}>
                        <Typography level="title-md">Personal info</Typography>
                        <Typography level="body-sm">
                            Customize your profile information.
                        </Typography>
                    </Box>
                    <Divider />
                    <Stack
                        direction="row"
                        spacing={3}
                    >
                        <Stack direction="column" spacing={1}>
                            <AspectRatio
                                ratio="1"
                                maxHeight={200}
                                sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                    loading="lazy"
                                    alt=""
                                />
                            </AspectRatio>
                            <IconButton
                                aria-label="upload new picture"
                                size="sm"
                                variant="outlined"
                                color="neutral"
                                sx={{
                                    bgcolor: 'background.body',
                                    position: 'absolute',
                                    zIndex: 2,
                                    borderRadius: '50%',
                                    left: 100,
                                    top: 170,
                                    boxShadow: 'sm',
                                }}
                            >
                                <EditRoundedIcon />
                            </IconButton>
                        </Stack>
                        <Stack spacing={2} sx={{ flex: 1 }}>
                            <form onSubmit={submitHandler} ref={formRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <Stack spacing={1}>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl
                                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                    >
                                        <Input required size="sm" placeholder="Full name" name='fullName' />
                                    </FormControl>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            size="sm"
                                            type="email"
                                            startDecorator={<EmailRoundedIcon />}
                                            placeholder="email"
                                            sx={{ flex: 1 }}
                                        />
                                    </FormControl>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel>Phone</FormLabel>
                                        <Input startDecorator={<Phone />} size="sm" name='phone' placeholder='Phone' />
                                    </FormControl>
                                </Stack>
                                {userStore.userType === UserType.Doctor ? (
                                    <>
                                        <Stack direction="row" spacing={2}>
                                            <FormControl sx={{ flex: 1 }}>
                                                <FormLabel>Speciality</FormLabel>
                                                <Select
                                                    required
                                                    size="sm"
                                                    placeholder="Speciality"
                                                    name='speciality'
                                                    startDecorator={<MedicalServicesIcon />}
                                                >
                                                    {Object.keys(Speciality).map((key) => (
                                                        <Option key={key} value={Speciality[key as keyof typeof Speciality]}>
                                                            {key}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl sx={{ flex: 1 }}>
                                                <FormLabel>License ID</FormLabel>
                                                <Input required startDecorator={<NumbersIcon />} size="sm" name='licenceID' placeholder='License ID' />
                                            </FormControl>
                                        </Stack>
                                        <Stack direction="row" spacing={2}>
                                            <FormControl sx={{ flex: 1 }}>
                                                <FormLabel>Office Location</FormLabel>
                                                <Select
                                                    required
                                                    size="sm"
                                                    placeholder="Office Location"
                                                    name='officeLocation'
                                                    startDecorator={<PinDropRounded />}
                                                >
                                                    {Object.keys(OfficeLocation).map((key) => (
                                                        <Option key={key} value={OfficeLocation[key as keyof typeof OfficeLocation]}>
                                                            {key}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl sx={{ flex: 1 }}>
                                                <FormLabel>Bio</FormLabel>
                                                <Textarea size="sm" name='bio' placeholder='Bio' />
                                            </FormControl>
                                        </Stack>
                                    </>
                                ) : (
                                    <Stack direction="row" spacing={2}>
                                        <FormControl sx={{ flex: 1 }}>
                                            <FormLabel>AMKA</FormLabel>
                                            <Input startDecorator={<NumbersIcon />} size="sm" name='amka' placeholder='AMKA' />
                                        </FormControl>
                                    </Stack>
                                )}
                            </form>
                        </Stack>
                    </Stack>
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button size="sm" variant="outlined" color="neutral">
                                Cancel
                            </Button>
                            <Button size="sm" variant="solid" onClick={() => formRef.current?.requestSubmit()}>
                                Save
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Stack >
        </Box >
    );
}