import React from 'react';
import {
    CREATE_PARTICIPANT
} from "../../components/NavBar/routes";
import { Link } from 'react-router-dom';

export function AdminPage() {

    return (<div>
        <Link to={CREATE_PARTICIPANT}>Create Partipant</Link>
    </div>
    );

}

