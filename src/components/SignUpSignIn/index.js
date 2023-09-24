
import React, { useState } from 'react'
import "./styles.css"
import Input from '../Input';
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import { auth, db, provider } from '../../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";
import Button from '../Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignupSigninComponent = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loginForm, setLoginForm] = useState(false)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()


    function signupWithEmail() {
        setLoading(true);
        console.log("name", name);
        console.log("email", email);
        console.log("password", password);
        console.log("confirmPassword", confirmPassword)


        //authenticate user, or craete new acc using email & pass
        if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
            if (password === confirmPassword) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        console.log("User>>>", user);
                        toast.success("User Created!")
                        setLoading(false);
                        setName("");
                        setEmail("")
                        setPassword("")
                        setConfirmPassword("");
                        createDoc(user);
                        navigate("/dashboard")
                        //create a doc with user id as follwing id

                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        toast.error(errorMessage);
                        setLoading(false);
                    });
            } else {
                toast.error("Password and Confirm Password don't match!")
                setLoading(false);
            }


        } else {
            toast.error("All fields are mandatory!");
            setLoading(false);
        }


    }

    async function createDoc(user) {
        setLoading(true)
        //Make sure that the doc with the uid doesn't exist
        //create a doc.

        if (!user) return;

        const userRef = doc(db, "user", user.uid);
        const userData = await getDoc(userRef);

        if (!userData.exists()) {
            try {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName ? user.displayName : name,
                    email: user.email,
                    photoURL: user.photoURL ? user.photoURL : "",
                    createAt: new Date(),
                });
                toast.success("Doc created!")
                setLoading(false)
            } catch (e) {
                toast.error(e.message)
                setLoading(false)
            }
        } else {
            // toast.error("Doc already exists")
            setLoading(false);
        }

    }
    function loginUsingEmail() {
        console.log("Email", email)
        console.log("Password", password)
        setLoading(true);
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    toast.success("User Logged In!");
                    console.log("User Logged in", user);
                    setLoading(false)
                    navigate("/dashboard")
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    toast.error(errorMessage)
                });
        } else {
            toast.error("All fields are mandatory!")
            setLoading(false)

        }


    }

    function googleAuth() {
        setLoading(true);
        try {
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    console.log("user>>>", user);
                    createDoc(user);
                    setLoading(false);
                    navigate("/dashboard")
                    toast.success("User authenticated");

                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                })
                .catch((error) => {
                    setLoading(false);
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(errorMessage);
                    // ...
                });

        } catch (e) {
            toast.error(e.message)
        }

    }



    return (
        <>
            {loginForm ? (
                <div className='signup-wrapper'>
                    <h2 className='title'>
                        Login on <span style={{ color: "var(--theme)" }} >Financely</span>
                    </h2>
                    <form>

                        <Input
                            label={"Email"}
                            state={email}
                            setName={setEmail}
                            placeholder={"johndoe12@gmail.com"}

                        />
                        <Input
                            type="password"
                            label={"Password"}
                            state={password}
                            setName={setPassword}
                            placeholder={"johndoe@123"}

                        />

                        <Button
                            disabled={loading}
                            text={loading ? "Loading..." : "Login Using Email and Password"}
                            onClick={loginUsingEmail}

                        />
                        <p className='p-login'>Or</p>
                        <Button
                            onClick={googleAuth}
                            text={loading ? "Loading..." : "Login Using Google"}
                            blue={true}

                        />
                        <p className='p-login'
                            onClick={() => setLoginForm(!loginForm)}
                            style={{ cursor: "pointer" }}
                        >

                            Or Don't Have An Account ? Click Here
                        </p>

                    </form>
                </div>
            ) : (
                <div className='signup-wrapper'>
                    <h2 className='title'>
                        Sign Up on <span style={{ color: "var(--theme)" }} >Financely</span>
                    </h2>
                    <form>
                        <Input
                            label={"Full Name"}
                            state={name}
                            setName={setName}
                            placeholder={"John Doe"}

                        />
                        <Input
                            label={"Email"}
                            state={email}
                            setName={setEmail}
                            placeholder={"johndoe12@gmail.com"}

                        />
                        <Input
                            type="password"
                            label={"Password"}
                            state={password}
                            setName={setPassword}
                            placeholder={"johndoe@123"}

                        />
                        <Input
                            type="password"
                            label={"Confirm Password"}
                            state={confirmPassword}
                            setName={setConfirmPassword}
                            placeholder={"johndoe@123"}

                        />

                        <Button
                            disabled={loading}
                            text={loading ? "Loading..." : "Signup Using Email and Password"}
                            onClick={signupWithEmail}

                        />
                        <p className='p-login'>Or</p>
                        <Button
                            onClick={googleAuth}
                            text={loading ? "Loading..." : "Signup Using Google"}
                            blue={true}

                        />
                        <p className='p-login'
                            onClick={() => setLoginForm(!loginForm)}
                            style={{ cursor: "pointer" }}
                        >
                            Or Have An Account Already ? Click Here
                        </p>
                    </form>
                </div>
            )
            }

        </>

    )
}

export default SignupSigninComponent