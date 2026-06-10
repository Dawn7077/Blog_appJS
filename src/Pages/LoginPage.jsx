import { useState } from "react"
import { useNavigate,Link } from "react-router-dom"
import {useAuth } from '../context/AuthContext'

export default function Login(){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError] = useState('')

    const {login} = useAuth()
    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault()
        setError('')

        if(!email.trim() || !password.trim())return setError('Please fill in all fields.')

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email))return setError('Please enter a valid email address.')
        
        if(password.length<6)return setError('Password must be at least 6 characters long.')

        try { 
            await login(email,password)
            console.log('Logging in with:',email,' --',password)
            navigate('/')
        } catch (error) {
            setError("credentials wrong, Please check your credentials.")
            console.error(error)
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
            borderRadius: '8px',
            backgroundColor: '#e8eaeb',
            border: '1px solid #cbd5e1',
            fontSize: '15px',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s',
            outline: 'none',
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
            marginTop: '10px'
        },
        error: {
            backgroundColor: '#fff5f5',
            color: '#e53e3e',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '20px',
            fontSize: '14px',
            border: '1px solid #fed7d7'
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
                    
            <h2 style={style.heading}>Sign In to Blog App</h2>
            {error && <p style={style.error}>{error}</p>}

            <form onSubmit={handleLogin}>
                <div style={{marginBottom:"15px"}}>
                    <input type="email" 
                        placeholder="Email Address"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        required
                        style={style.input}
                    />
                </div>
               <div style={{marginBottom:"15px"}}>
                    <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)} 
                        required
                        style={style.input}
                    />
                </div> 

                <button type="submit" style={style.button}>LogIn</button>
            </form>

            <p style={style.footerText}> Already have an account? <Link to='/signup'>signup here</Link></p>
        </div>
    )
}