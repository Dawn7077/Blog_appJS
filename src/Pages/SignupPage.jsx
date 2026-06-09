import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";


export default function SignupPage(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false) 
    const navigate = useNavigate()

    async function handleSignup(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            let user = await createUserWithEmailAndPassword(auth,email,password)
            console.log(user)
            navigate('/')
        } catch (error) {
            console.log(error)
            setError("Error in creating an account. Password might be too short (min 6 chars).");
        }finally{
            setLoading(false)
        }
        
    }

    const style = {
        container: {
            maxWidth: '420px',
            margin: '60px auto',
            padding: '40px 30px',
            textAlign: 'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            backgroundColor: '#ffffff',
            border: '1px solid #eaeaea'
        },
        heading: {
            marginBottom: '24px',
            color: '#2d3748',
            fontSize: '24px',
            fontWeight: '600'
        },
        inputGroup: {
            marginBottom: '20px',
            textAlign: 'left'
        },
        input: {
            width: '100%',
            padding: '12px 16px',
            backgroundColor: '#f2f2f2',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '15px',
            boxSizing: 'border-box',
            outline: 'none',
            color: '#2d3748'
        },
        button: {
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#3182ce',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            marginTop: '10px',
            opacity: loading ? 0.7 : 1
        },
        error: {
            backgroundColor: '#fff5f5',
            color: '#e53e3e',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '20px',
            fontSize: '14px',
            border: '1px solid #fed7d7',
            textAlign: 'left',
            lineHeight: '1.4'
        },
        footerText: {
            marginTop: '24px',
            color: '#718096',
            fontSize: '14px'
        },
        link: {
            color: '#3182ce',
            textDecoration: 'none',
            fontWeight: '500'
        }
    }

    return(
        <div style={style.container}>
            <h2 style={style.heading}>Create an Account</h2>
            {error && <p style={style.error}>{error}</p>}

            <form onSubmit={handleSignup}>
                <div style={style.inputGroup}> 
                    <input type="email" placeholder="Email" value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        required
                        style={style.input}
                    />

                    <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                        style={style.input}
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    style={style.button}
                >{loading?'Registering':'Sign Up'}</button>

            </form>

            <p style={{ marginTop: "15px" }}> Already have an account? <Link to='/login'   style={style.link}>Login here</Link></p>
        </div>
    )
}
