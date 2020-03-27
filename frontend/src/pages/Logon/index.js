import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import heroesImg from "./../../assets/heroes.png";
import logoImg from "./../../assets/logo.svg";
import icon from "./../../assets/login.svg";
import api from './../../services/api';

export default function Logon(){

    const [id, setId] = useState(''); 
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', {id});
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch(err){
            alert('Falha no login, tente novamente');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input type="txt" placeholder="Seu ID"
                    value={id}
                    onChange = {e => setId(e.target.value)}>
                    </input>
                    <button type="submit" className="button">Entrar</button>

                   
                    <Link className="back-link" to="/register">
                        <img src={icon} alt="login-icon" className="icon"/>
                        <p>Cadastre-se Aqui</p>
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="heroes"/>
        </div>
    );
}