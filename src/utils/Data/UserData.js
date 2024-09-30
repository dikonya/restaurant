import {makeAutoObservable} from 'mobx'
export default class UserStore {
    constructor() {
        this._userAuth=[
        {  
            id:1 , 
            name: "Nick", 
            email:"aman@gmail.com", 
            password:"123" ,
            confirmPassword: true   
        },
        {
            id:2, 
            name:'Di',
            email: "asd@gmail.com",
            password:'123',
            confirmPassword:true
        }
            
    ];
        this._isAuth = false ;
        this._isAdmin = true ;
        this._user = {} ;
        makeAutoObservable(this);
    }
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setIsAdmin(bool) {
        this._isAdmin = bool
    }
    setUserAuth(userAuth){
        this._userAuth = userAuth; 

    }
    setUser(user) {
        this._user = user
    }
    get userAuth(){
        return this._userAuth
    }
    get isAuth() {
        return this._isAuth
    }
    get isAdmin() {
        return this._isAdmin
    }
    get user() {
        return this._user
    }
}