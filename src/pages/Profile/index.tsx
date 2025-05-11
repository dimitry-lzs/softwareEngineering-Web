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
import PhoneIcon from '@mui/icons-material/Phone';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SectionTitle from '../../components/SectionTitle';

export default function Profile() {
    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <SectionTitle 
                title="Profile"
                subtitle="Manage your profile information and settings."
            />
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
                <Card>
                    <Box>
                        <Typography level="title-lg">Personal info</Typography>
                    </Box>
                    <Divider />
                    <Stack
                        direction="row"
                        spacing={3}
                        sx={{
                            display: {
                                xs: 'none',
                                md: 'flex',
                                flexWrap: 'wrap',
                            },
                            my: 1
                        }}

                    >
                        <Stack direction="column" spacing={1}>
                            <AspectRatio
                                ratio="1"
                                maxHeight={200}
                                sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                    srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
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
                        <Stack spacing={2} sx={{ flexGrow: 1 }}>
                            <Stack spacing={1}>
                                <FormLabel>Name</FormLabel>
                                <FormControl
                                    sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                >
                                    <Input size="sm" placeholder="First name" />
                                    <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} />
                                </FormControl>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <FormControl sx={{ flex: 1 }}>
                                    <FormLabel>Phone Number</FormLabel>
                                    <Input
                                        size="sm"
                                        defaultValue="69999999999"
                                        startDecorator={<PhoneIcon />}
                                    />
                                </FormControl>
                                <FormControl sx={{ flex: 1 }}>
                                    <FormLabel>AMKA</FormLabel>
                                    <Input
                                        size="sm"
                                        defaultValue="09030224674"
                                        startDecorator={<AssignmentIndIcon />}
                                    />
                                </FormControl>
                            </Stack>
                            <Stack direction="row" alignItems="flex-end" justifyContent="space-between">
                                <FormControl sx={{ flexGrow: 1 }}>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        size="sm"
                                        type="email"
                                        startDecorator={<EmailRoundedIcon />}
                                        placeholder="email"
                                        defaultValue="siriwatk@test.com"
                                        sx={{ width: '255px' }} // adjust the width as needed
                                    />
                                </FormControl>
                                <Typography level="body-xs" color="neutral" sx={{ pr: 2, pb: 1 }}>
                                    Member since ##/##/##
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack
                        direction="column"
                        spacing={2}
                        sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
                    >
                        <Stack direction="row" spacing={2}>
                            <Stack direction="column" spacing={1}>
                                <AspectRatio
                                    ratio="1"
                                    maxHeight={108}
                                    sx={{ flex: 1, minWidth: 108, borderRadius: '100%' }}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                        srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
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
                                        left: 85,
                                        top: 180,
                                        boxShadow: 'sm',
                                    }}
                                >
                                    <EditRoundedIcon />
                                </IconButton>
                            </Stack>
                            <Stack spacing={1} sx={{ flexGrow: 1 }}>
                                <FormLabel>Name</FormLabel>
                                <FormControl
                                    sx={{
                                        display: {
                                            sm: 'flex-column',
                                            md: 'flex-row',
                                        },
                                        gap: 2,
                                    }}
                                >
                                    <Input size="sm" placeholder="First name" />
                                    <Input size="sm" placeholder="Last name" />
                                </FormControl>
                            </Stack>
                        </Stack>
                        <FormControl>
                            <FormLabel>Phone Number</FormLabel>
                            <Input size="sm" defaultValue="69999999999" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>AMKA</FormLabel>
                            <Input size="sm" defaultValue="482934324" />
                        </FormControl>
                        <FormControl sx={{ flexGrow: 1 }}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                size="sm"
                                type="email"
                                startDecorator={<EmailRoundedIcon />}
                                placeholder="email"
                                defaultValue="siriwatk@test.com"
                                sx={{ flexGrow: 1 }}
                            />
                        </FormControl>
                    </Stack>
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button size="sm" variant="solid" disabled >
                                Save
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Stack >
        </Box >
    );
}