import {
    Button,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Typography,
} from '@mui/joy';
import { Link } from 'react-router';
import { userStore } from '../../stores';
import type { SignInFormElement } from '../types';

export default function SignIn() {
    return (
        <>
            <Stack sx={{ gap: 4, mb: 2 }}>
                <Stack sx={{ gap: 1 }}>
                    <Typography component='h1' level='h3'>
                        Sign in
                    </Typography>
                    <Typography level='body-sm'>
                        New to company? <Link to='/auth/register'>Sign up</Link>
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
                    onSubmit={async (
                        event: React.FormEvent<SignInFormElement>,
                    ) => {
                        event.preventDefault();
                        const formElements = event.currentTarget.elements;
                        const data = {
                            email: formElements.email.value,
                            password: formElements.password.value,
                        };
                        await userStore.login(data);
                    }}
                >
                    <FormControl required>
                        <FormLabel>Email</FormLabel>
                        <Input type='email' name='email' />
                    </FormControl>
                    <FormControl required>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' name='password' />
                    </FormControl>
                    <Stack sx={{ gap: 4, mt: 2 }}>
                        <Button type='submit' fullWidth>
                            Sign in
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </>
    );
}
