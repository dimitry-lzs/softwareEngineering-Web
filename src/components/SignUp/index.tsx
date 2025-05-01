import { Stack, Typography, Divider, FormControl, FormLabel, Input, Box, Checkbox, Button } from "@mui/joy";
import { Link } from "react-router";
import { SignInFormElement } from "../types";

export default function SignUp() {
    return (
        <>
            <Stack sx={{ gap: 4, mb: 2 }}>
                <Stack sx={{ gap: 1 }}>
                    <Typography component="h1" level="h3">
                        Sign Up
                    </Typography>
                    <Typography level="body-sm">
                        Already a user?{' '}
                        <Link to="/auth/login" >
                            Sign In
                        </Link>
                    </Typography>
                </Stack>
            </Stack>
            <Divider
                sx={(theme) => ({
                    [theme.getColorSchemeSelector('light')]: {
                        color: { xs: '#FFF', md: 'text.tertiary' },
                    },
                })}
            >
                or
            </Divider>
            <Stack sx={{ gap: 4, mt: 2 }}>
                <form
                    onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                        event.preventDefault();
                        const formElements = event.currentTarget.elements;
                        const data = {
                            email: formElements.email.value,
                            password: formElements.password.value,
                            persistent: formElements.persistent.checked,
                        };
                        alert(JSON.stringify(data, null, 2));
                    }}
                >
                    <FormControl required>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" name="email" />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" name="password" />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input type="confirmPassword" name="password" />
                    </FormControl>
                    <Stack sx={{ gap: 4, mt: 2 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Checkbox size="sm" label="Remember me" name="persistent" />
                        </Box>
                        <Button type="submit" fullWidth>
                            Create Account
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </>
    );
}