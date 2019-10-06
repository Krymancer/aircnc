import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import api from "../../services/api";

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    //const [requests, setRequests] = useState([]);

    useEffect(() => {
        const user_id = localStorage.getItem("user");

        api.get("/dashboard", {
            headers: { user_id }
        }).then(response => {
            console.log(response);
            setSpots(response.data);
        });
    }, []);

    return (
        <>
        <ul className="spot-list">
            {spots.map(spot => (
                <li key={spot._id}>
                    <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
                    <strong>{spot.company}</strong>
                    <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>

                </li>
            ))}
        </ul>

        <Link to="new">
            <button className="btn">Cadastrar novo spot</button>
        </Link>
        </>
    );
}