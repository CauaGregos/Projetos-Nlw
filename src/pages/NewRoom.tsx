import { Link, useHistory } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import GoogleIcon from '../assets/images/google-icon.svg';
import { FormEvent, useState } from 'react';
import { Button } from '../components/button';
import '../styles/auth.scss';
import { useContext } from 'react';
import { AuthContext, AuthContextProvider } from '../contexts/AuthContext';
import { useAuth } from '../hooks/UseAuth';
import { database } from '../services/firebase';

export function NewRoom() {

    const [newRoom, setNewRoom] = useState('');
    const { user } = useContext(AuthContext)
    const history = useHistory()

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebase = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebase.key}`)

    }

    //const { user } = useContext(AuthContext);

    return (
        <div id="page-auth">
            <aside>

                <img src={illustrationImg} alt="Ilustração de perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo!</strong>
                <p>Tire dúvidas de sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className='Main-content'>
                    <img src={logoImg} alt="letmeask" />

                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom} />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entra em uma sala ja existente <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}