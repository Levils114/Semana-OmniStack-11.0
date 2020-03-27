import React, {useState} from 'react';
import "./style.css";
import logoImg from "./../../assets/logo.svg";
import {Link, useHistory} from 'react-router-dom';
import icon from './../../assets/arrow-left.svg';
import api from "./../../services/api";


export default function Register() {

    const [name, setName] = useState("") ;
    const [email, setEmail] = useState("") ;
    const [wpp, setWpp] = useState("") ;
    const [city, setCity] = useState("") ;
    const [uf, setUf] = useState("") ;

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {name,email,wpp,city,uf};

        try{
            const response = await api.post('ongs', data);

            alert(`Seu ID é: ${response.data.id}`);
            history.push('/');
        } catch (err){
            alert("Erro no cadatro, tente novamente");
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

                    <Link className="back-link" to="/">
                        <img src={icon} alt="login-icon" className="icon"/>
                        <p>Não tenho cadastro</p>
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input type="txt" placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <input type="email" placeholder="Email da ONG"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input type="txt" placeholder="Whatsapp - Ex: (99) 99999-9999"
                    value={wpp}
                    onChange={e => setWpp(e.target.value)}
                    />

                    <div className="input-group">
                        <input type="txt" placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        />
                        <input type="txt" placeholder="UF" style={{width:80}}
                        value={uf}
                        onChange={e => setUf(e.target.value)}
                        />
                    </div>    

                    
                    <button className="button" type="submit">Cadastrar</button>
                
                </form>
            </div>
        </div>
    );
}