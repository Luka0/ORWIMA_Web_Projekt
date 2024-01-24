import { useState, useEffect } from "react";
import { Button, Input } from "antd";
import { useParams } from "react-router";
import { db } from "./Firebase";
import { collection, getDocs, addDoc, updateDoc, doc } from "@firebase/firestore"
import { useNavigate } from 'react-router-dom'


export default function EndGame() {

    let { user, win } = useParams()
    const [users, setUsers] = useState();
    let userExists = false;
    const [showStats, setShowStats] = useState(false);
    const navigate = useNavigate();

    // fetching all users from firebase
    const UsersCollectionRef = collection(db, "users")
    useEffect(() => {
        const getUsersData = async () => {
          const data = await getDocs(UsersCollectionRef)
          setUsers(data.docs.map((elem) => ({ ...elem.data(), id: elem.id })))
        }
    
        getUsersData()
    }, [])

    const CreateUser = async () => {
        console.log("kreiram novog usera");
        await addDoc(UsersCollectionRef, { 
            name: user, 
            wins: win==="true" ? 1 : 0, 
            losses: win==="true" ? 0 : 1, 
        })
        window.location.reload()
    }

    const handleDb = async () => {

        setShowStats(true);

        users.forEach(u => {
            if(u.name === user){
                userExists=true;
            }
        });

        if(!userExists){
            // pushaj na bazu novog usera
            CreateUser();
        }
        else{
            // update user stats
            const currentUser = users.filter((object) => object.name === user)[0]
            const userDoc = doc(db, "users", currentUser.id)
            const newStats = { 
                wins: win==="true" ? currentUser.wins + 1 : currentUser.wins,
                losses: win==="true" ? currentUser.losses : currentUser.losses + 1,
            }
            console.log("Updated the Data on System")
            await updateDoc(userDoc, newStats) 
            console.log("Updated the Data on the Server")
            //window.location.reload()
        }
    }

    function handlePlayAgain(){
        navigate(`/game/${user}`);
    }

    function handleChangePlayer(){
        navigate(`/`);
    }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {win==="true" ? 
        (<h1 style={{ color: 'white' }}>YOU WON!</h1>) :
        (<h1 style={{ color: 'white' }}>YOU LOST!</h1>)
      }
      {showStats && (
            <div>
                {users &&
                users
                    .filter((object) => object.name === user)
                    .map((filteredUser) => (
                        <div style={{ 
                            margin: '20px 0',
                            padding: '10px',
                            backgroundColor: '#6584a1',
                            color: 'white',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h3>{filteredUser.name}'s stats:</h3>
                            <p>Wins: {win === "true" ? filteredUser.wins + 1 : filteredUser.wins}</p>
                            <p>Losses: {win === "true" ? filteredUser.losses : filteredUser.losses + 1}</p>
                        </div>
                    ))}
            </div>
        )}
      
      {!showStats && (
        <Button 
            onClick={() => handleDb() }
            type="primary" 
            style={{ background: "#32578D", borderColor: "black" }}
        >
            Show all time stats
        </Button>
      )}

        {showStats && (
        <div>
            <Button
                type="primary" 
                style={{ background: "#32578D", borderColor: "black", marginRight: '15px' }}
                onClick={() => handlePlayAgain() }
            >
                Play again
            </Button>
            <Button 
                type="primary" 
                style={{ background: "#32578D", borderColor: "black", marginLeft: '15px' }}
                onClick={() => handleChangePlayer() }
            >
                Change player
            </Button>
        </div>
        )}
      
    </div>
  );
}