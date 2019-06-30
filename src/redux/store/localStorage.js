export const loadState = () =>{
    try
    {
        const serilizedState = localStorage.getItem("state");
        if(serilizedState === null)
        {
            return undefined;
        }
        else
        {
            return JSON.parse(serilizedState);
        }
    }
    catch( error )
    {
        return undefined;
    }
}

export const setState = ( state ) =>{

    localStorage.setItem('state', JSON.stringify(state));
    
}