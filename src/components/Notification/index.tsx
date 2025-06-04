import { Snackbar } from '@mui/joy';
import { observer } from 'mobx-react-lite';
import { notificationStore } from '../../stores';

export default observer(function Notification() {
    const { open, message, type } = notificationStore.getNotification();
    return (
        <Snackbar
            open={open}
            variant={'outlined'}
            color={type}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            {message}
        </Snackbar>
    );
});
