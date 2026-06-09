import { useState } from "react"
import { db } from "../firebase/config"
import { collection,addDoc,serverTimestamp } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"


export default function AddBlog(){
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [loading,setloading] = useState(false)
    const {currentUser} = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        if(!title.trim() || !content.trim()) return
        setloading(true)

        try {
            const blogsFolfer = collection(db,'blogs')
            await addDoc(blogsFolfer,{
                title:title,
                content:content,
                authorId:currentUser.uid,
                authorEmail:currentUser.email,
                createdAt:serverTimestamp()
            })

            navigate('/')
        } catch (error) {
            console.log(error)
             alert("Error in creating blog post.");
        }finally{
            setloading(false)
        }
    }
    const style = {
        container: {
            maxWidth: '650px',
            margin: '50px auto',
            padding: '40px 30px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0'
        },
        heading: {
            marginTop: 0,
            marginBottom: '24px',
            color: '#1a202c',
            fontSize: '24px',
            fontWeight: '600'
        },
        inputGroup: {
            marginBottom: '20px',
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#4a5568'
        },
        input: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            backgroundColor: '#e8eaeb',
            border: '1px solid #cbd5e1',
            fontSize: '16px',
            boxSizing: 'border-box',
            outline: 'none',
            color: '#2d3748',
            fontFamily: 'inherit'
        },
        textarea: {
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            backgroundColor: '#e8eaeb',
            border: '1px solid #cbd5e1',
            fontSize: '15px',
            boxSizing: 'border-box',
            outline: 'none',
            color: '#2d3748',
            fontFamily: 'inherit',
            resize: 'vertical',
            lineHeight: '1.6'
        },
        btnGroup: {
            display: 'flex',
            gap: '12px',
            marginTop: '25px'
        },
        publishBtn: {
            padding: '12px 24px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: '600',
            backgroundColor: '#3182ce',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            transition: 'background-color 0.2s',
            opacity: loading ? 0.7 : 1
        },
        cancelBtn: {
            padding: '12px 24px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: '500',
            backgroundColor: '#fff',
            color: '#4a5568',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            transition: 'all 0.2s'
        }
    }



    return(
         <div style={style.container}>
            <h2 style={style.heading}>Create a New Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div style={style.inputGroup}>
                    <label style={style.label}>Blog Title</label>
                    <input type="text"
                        placeholder="Blog Title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        required
                         style={style.input}
                        />
                </div>
                <div style={style.inputGroup}>
                    <label style={style.label}>Content</label>
                    <textarea
                        placeholder=" Write your story .."
                        value={content}
                        onChange={(e)=>setContent(e.target.value)}
                        required
                        rows="8"
                         style={style.textarea}
                    />
                </div>

                <div style={style.btnGroup}> 
                    <button 
                        type="submit"
                        disabled={loading}
                        style={style.publishBtn}
                    > 
                        {loading?'Publishing...':'Save blog'}
                    </button>

                    <button 
                        type="button"
                        onClick={() => navigate('/')}
                        style={style.cancelBtn}
                    > 
                        Cancel
                    </button>
                </div>
            </form>

         </div>
    )
}