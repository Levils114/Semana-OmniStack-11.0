import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import "./styles.css";
import api from "./../../services/api";
import logoImg from "./../../assets/logo.svg";
import icon from './../../assets/power.svg';
import icon2 from './../../assets/trash-2.svg';

export default function Profile(){

    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    useEffect(() => {
        api.get('profile',{
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })    
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incidents => incidents.id !== id ));
        } catch (err){
            alert('Erro ao tentar deletar caso, tente novamente');
        } 
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                    <span>Bem Vinda {ongName}</span>

                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>

                <button type="button" onClick={handleLogout}>
                    <img src={icon} alt="power"/>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incidets => {
                    return (
                    <li key={incidets.id}>
                        <strong>Caso:</strong>
                        <p>{incidets.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incidets.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incidents.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incidets.id)}>
                            <img src={icon2} alt="Delete" />
                        </button>
                    </li>
                    );
                })}
            </ul>
    </div>
    );
}