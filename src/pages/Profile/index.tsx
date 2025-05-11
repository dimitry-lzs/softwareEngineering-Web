import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PhoneIcon from "@mui/icons-material/Phone";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SectionTitle from "../../components/SectionTitle";
import { useState } from "react";

export default function Profile() {
    const [disabled, setDisabled] = useState(true);
    const [formValues] = useState({
        firstName: "Chuck",
        lastName: "Norris",
        phoneNumber: "69999999999",
        amka: "09030224674",
        email: "chucknorrispushestheearth@test.com",
        createDate: "2023-10-01",
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const values = Object.fromEntries(formData.entries());
        console.log(values);
        setDisabled(true);
    };

    return (
        <Box sx={{ flex: 1, width: "100%" }}>
            <SectionTitle
                title="Profile"
                subtitle="Manage your profile information and settings."
            />
            <Stack
                spacing={4}
                sx={{
                    display: "flex",
                    maxWidth: "800px",
                    mx: "auto",
                    px: { xs: 2, md: 6 },
                    py: { xs: 6, md: 3 },
                }}
            >
                <Card>
                    <Box>
                        <Typography level="title-lg">Personal info</Typography>
                    </Box>
                    <Divider />
                    <form onSubmit={handleSubmit} onChange={() => setDisabled(false)}>
                        <Stack
                            direction="row"
                            spacing={3}
                            sx={{
                                display: {
                                    xs: "none",
                                    md: "flex",
                                    flexWrap: "wrap",
                                },
                                my: 1,
                            }}
                        >
                            <Stack direction="column" spacing={1}>
                                <AspectRatio
                                    ratio="1"
                                    maxHeight={200}
                                    sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
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
                                        bgcolor: "background.body",
                                        position: "absolute",
                                        zIndex: 2,
                                        borderRadius: "50%",
                                        left: 100,
                                        top: 170,
                                        boxShadow: "sm",
                                    }}
                                >
                                    <EditRoundedIcon />
                                </IconButton>
                            </Stack>
                            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                                <Stack spacing={1}>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl
                                        sx={{
                                            display: { sm: "flex-column", md: "flex-row" },
                                            gap: 2,
                                        }}
                                    >
                                        <Input
                                            name="firstName"
                                            size="sm"
                                            placeholder="First name"
                                            defaultValue={formValues.firstName}
                                        />
                                    </FormControl>
                                    <FormControl
                                        sx={{
                                            display: { sm: "flex-column", md: "flex-row" },
                                            gap: 2,
                                        }}
                                    >
                                        <Input
                                            name="lastName"
                                            size="sm"
                                            placeholder="Last name"
                                            defaultValue={formValues.lastName}
                                            sx={{ flexGrow: 1 }}
                                        />
                                    </FormControl>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel>Phone Number</FormLabel>
                                        <Input
                                            name="phoneNumber"
                                            type="tel"
                                            size="sm"
                                            defaultValue={formValues.phoneNumber}
                                            startDecorator={<PhoneIcon />}
                                        />
                                    </FormControl>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel>AMKA</FormLabel>
                                        <Input
                                            name="amka"
                                            size="sm"
                                            defaultValue={formValues.amka}
                                            startDecorator={<AssignmentIndIcon />}
                                        />
                                    </FormControl>
                                </Stack>
                                <Stack
                                    direction="row"
                                    alignItems="flex-end"
                                    justifyContent="space-between"
                                >
                                    <FormControl sx={{ flexGrow: 1 }}>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            name="email"
                                            size="sm"
                                            type="email"
                                            startDecorator={<EmailRoundedIcon />}
                                            placeholder="email"
                                            defaultValue={formValues.email}
                                            sx={{ width: "255px" }} // adjust the width as needed
                                        />
                                    </FormControl>
                                    <Typography
                                        level="body-xs"
                                        color="neutral"
                                        sx={{ pr: 2, pb: 1 }}
                                    >
                                        Member since {formValues.createDate}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack
                            direction="column"
                            spacing={2}
                            sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
                        >
                            <Stack direction="row" spacing={2}>
                                <Stack direction="column" spacing={1}>
                                    <AspectRatio
                                        ratio="1"
                                        maxHeight={108}
                                        sx={{ flex: 1, minWidth: 108, borderRadius: "100%" }}
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
                                            bgcolor: "background.body",
                                            position: "absolute",
                                            zIndex: 2,
                                            borderRadius: "50%",
                                            left: 85,
                                            top: 180,
                                            boxShadow: "sm",
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
                                                sm: "flex-column",
                                                md: "flex-row",
                                            },
                                            gap: 2,
                                        }}
                                    >
                                        <Input
                                            name="firstName"
                                            size="sm"
                                            placeholder="First name"
                                            defaultValue={formValues.firstName}
                                        />
                                    </FormControl>
                                    <FormControl
                                        sx={{
                                            display: {
                                                sm: "flex-column",
                                                md: "flex-row",
                                            },
                                            gap: 2,
                                        }}
                                    >
                                        <Input
                                            name="lastName"
                                            size="sm"
                                            placeholder="Last name"
                                            defaultValue={formValues.lastName}
                                        />
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <FormControl>
                                <FormLabel>Phone Number</FormLabel>
                                <Input
                                    name="phoneNumber"
                                    type="tel"
                                    size="sm"
                                    defaultValue={formValues.phoneNumber}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>AMKA</FormLabel>
                                <Input
                                    name="amka"
                                    size="sm"
                                    defaultValue={formValues.amka}
                                />
                            </FormControl>
                            <FormControl sx={{ flexGrow: 1 }}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    name="email"
                                    size="sm"
                                    type="email"
                                    startDecorator={<EmailRoundedIcon />}
                                    placeholder="email"
                                    defaultValue={formValues.email}
                                    sx={{ flexGrow: 1 }}
                                />
                            </FormControl>
                        </Stack>
                        <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
                            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                                <Button
                                    size="sm"
                                    variant="solid"
                                    disabled={disabled}
                                    type="submit"
                                    startDecorator={<EditRoundedIcon />}
                                >
                                    Save
                                </Button>
                            </CardActions>
                        </CardOverflow>
                    </form>
                </Card>
            </Stack>
        </Box>
    );
}
