import { useRef, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fullfilled, rejected, logout } from './loginSlice'
import { setUserData, clearUserData} from '../userData/userDataSlice'
import io from 'socket.io-client'
import './login.css'
const socket = io.connect("http://localhost:3001"); 


export function Login() {

    /* Selectors and dispatchers */
    const isLoggedinSelector = useSelector((state) => state.login.isLoggedIn)
    const errorMessageSelector =  useSelector((state) => state.login.errorMessage)
    const forenameSelector =  useSelector((state) => state.userData.forename)
    const surnameSelector =  useSelector((state) => state.userData.surname)
    const dispatch = useDispatch()


    /** useRefs, useStates and useEffects */
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])


    /** functions */
    const signOut = () => {
        dispatch(clearUserData())
        dispatch(logout())
    }

    /** result gets checked (currently hardcoded) on serverside via socket.io
     * and the loginstatus (in loginslice) and userData (in userDataslice) get dispatched
     * in the classic Redux pattern (not 100% sure if the reducers are best practice)
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        socket.emit("request_login", {user, pwd});
        socket.on("loginstatus", (result, user) => {
            if (result === true) {
                dispatch(fullfilled())
                dispatch(setUserData(user))
            } else {
                dispatch(rejected())
                setErrMsg(errorMessageSelector)
            }
        })
    }

    /** success varibale gets changed to true when the login is successfull
     * -> Loginsection gets replaced with a "logged-in-section"
     */
    return (
        <>
         {isLoggedinSelector ? (
            <section>
                <h1>Hello </h1>
                {forenameSelector} {surnameSelector}
                <br/>
                <p>
                    <button onClick={signOut}>Sign Out</button>
                </p>
            </section>
        ): (
        <section>
            <p 
                ref={errRef}
                className={errMsg? "errmsg": "offscreen"}
                aria-live="asserive"
                color='red'>{errMsg}
            </p>
            <h1>Sign In</h1>
            <form>
                <label htmlFor="username">Username</label>
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete= "off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button onClick={handleSubmit}>Sign In</button>
            </form>
        </section>
        )}
        </>
    )

}