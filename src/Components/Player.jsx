import { useState } from "react"

export default function Player({ initialName,symbol,isActive} ){

    const [isEditing,setIsEditing] = useState(false);
    const [defaultPlayerName,playerNameUpdate] = useState(initialName);
    
    function changeEditState(){
        setIsEditing((editing)=>!editing);
    }

    function onHandleChange(event){
        playerNameUpdate(event.target.value);
    }

    let PlayerName = <span class="player-name">{defaultPlayerName}</span>
    let btnCaption = "Edit";

    if(isEditing){
        PlayerName = <input type="text" required value={defaultPlayerName} onChange={onHandleChange}></input>
        btnCaption = "Save";
    }

    return(
        <li className={isActive ? 'active' : undefined}>
            <span class="player"></span>
            {PlayerName}
            <span class="player-symbol">{symbol}</span>
            <button onClick={changeEditState}>{btnCaption}</button>
        </li>
    )
}