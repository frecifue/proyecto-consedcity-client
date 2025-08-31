import React, { useState, useEffect } from "react";
import { Team } from "../../../../../api";

import "swiper/css"; 
import "swiper/css/navigation"; 
import "swiper/css/pagination"; 

import "./ListTeamHome.scss"
import { ListTeam } from "../../../Team";

const teamController = new Team();

export function ListTeamHome() {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        (async () => {
        try {
            setTeam([]);
            const {data} = await teamController.getTeams(1, 1000, true);
            setTeam(data.teams);
        } catch (error) {
            console.error(error);
        }
        })();
    }, []);

    return <ListTeam team={team} />;    
}
