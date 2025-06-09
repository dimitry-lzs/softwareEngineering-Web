import * as React from 'react';
import { useParams } from 'react-router';
import ViewDoctor from './viewDoctor';
import ViewDetails from './viewDetails';


export default function BookAppointment() {
    const { id } = useParams<{ id: string }>();
    const [page, setPage] = React.useState(1);

    return (
        <>
            {page === 1 ? (
                <ViewDoctor
                    id={id ?? ''}
                    setPage={setPage}
                />
            ) : (
                <ViewDetails
                    id={id ?? ''}
                    setPage={setPage}
                />
            )
            }
        </>
    );
}
