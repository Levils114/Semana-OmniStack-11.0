import React, {useState} from 'react';
import "./styles.css";
import logoImg from "./../../assets/logo.svg";
import {Link, useHistory} from 'react-router-dom';
import icon from './../../assets/arrow-left.svg';
import api from "./../../services/api";

export default function NewIncident(){

    const ongId = localStorage.getItem('ongId');
    const [title, setTitle] = useState('');
    const [description, setDescription] =  useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {title, description, value};

        try{
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongId,
                }
            })

            history.puch('/profile');
        } catch (err){
            alert("Não foi possível cadastrar o caso, tente novamente.");
        }
    }


    return(
        <div className="new-incident">
        <div className="container">
            <section>
                <img src={logoImg} alt="Be The Hero"/>
                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso</p>

                <Link className="back-link" to="/profile">
                    <img src={icon} alt="login-icon" className="icon"/>
                    <p>Voltar para home</p>
                </Link>
            </section>

            <form onSubmit={handleNewIncident}>
                <input type="txt" placeholder="Título do caso" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                />

                <textarea placeholder="Descrição"
                value={description}
                onChange={e => setDescription(e.target.value)}
                />

                <input type="txt" placeholder="Valor em Reais"
                value={value}
                onChange={e => setValue(e.target.value)}
                />
                
                <button className="button" type="submit">Cadastrar</button>
                <Link to="/profile">
                    <button className="button" type="submit">Cancelar</button>
                </Link>    
                
            </form>
        </div>
    </div>
    );
}