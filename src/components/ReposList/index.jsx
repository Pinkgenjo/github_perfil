import { useEffect, useState } from "react";

import styles from './ReposList.module.css'

const ReposList = ({ nomeusuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstacarregando] = useState(true)

    useEffect(() => {
        setEstacarregando(true)
        fetch(`https://api.github.com/users/${nomeusuario}/repos`)
        .then(res => res.json())
        .then(resJson => {
            setTimeout(() =>{
                setEstacarregando(false)
                setRepos(resJson);
            }, 3000)
        });
    }, [nomeusuario]);

    return (
        <div className="container">
        {estaCarregando ? (
                <h1>Carregando...</h1>
        ) :(
        <ul className={styles.list}>
            {repos.map(repositorio => {
                return (
                    <li className={styles.listItem} key={repositorio.id}>
                        <div className={styles.itemName}>
                        <b>Nome: </b> {repositorio.name} <br />
                        </div>
                    <div className={styles.itemLanguage}>
                    <b>Linguagem: </b> {repositorio.language} <br />
                    </div>
                        <a className={styles.itemLink} target="_blank" href={repositorio.html_url}>Visitar no GitHub</a>
                    </li>
                );
            })}
        </ul>
        )}
        </div>
    );
};

export default ReposList;
