


export function getLoggedUser(){
    const loggedUser = localStorage.getItem("LOGGED_USER");
    if(!loggedUser) return null;
    return JSON.parse(loggedUser);
}


export function setLoggedUser(objToCache:any){
    localStorage.setItem("LOGGED_USER", JSON.stringify(objToCache));
}

export function removeLoggedUser(){
    localStorage.removeItem("LOGGED_USER");
}