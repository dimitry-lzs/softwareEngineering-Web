import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PhoneIcon from "@mui/icons-material/Phone";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SectionTitle from "../../components/SectionTitle";
import { useState } from "react";
import { AspectRatio, Box, Button, Card, CardActions, CardOverflow, Divider, FormControl, FormLabel, IconButton, Input, Stack, Typography } from "@mui/joy";

export default function Profile() {
    const [disabled, setDisabled] = useState(true);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        console.log("Form submitted: ", formJson);
        setDisabled(true);
    };

    const handleChange = () => {
        disabled && setDisabled(false);
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
                    <form
                        onSubmit={handleSubmit}
                    >
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
                                            onChange={handleChange}
                                            required
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
                                            onChange={handleChange}
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
                                            placeholder="Phone Number"
                                            onChange={handleChange}
                                            startDecorator={<PhoneIcon />}
                                        />
                                    </FormControl>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel>AMKA</FormLabel>
                                        <Input
                                            name="amka"
                                            size="sm"
                                            placeholder="AMKA"
                                            onChange={handleChange}
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
                                            placeholder="Email"
                                            onChange={handleChange}
                                            sx={{ width: "255px" }} // adjust the width as needed
                                        />
                                    </FormControl>
                                    <Typography
                                        level="body-xs"
                                        color="neutral"
                                        sx={{ pr: 2, pb: 1 }}
                                    >
                                        Member since 2023-10-01
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                        <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
                            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                                <Button
                                    size="sm"
                                    variant="solid"
                                    type="submit"
                                    startDecorator={<EditRoundedIcon />}
                                    disabled={disabled}
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
