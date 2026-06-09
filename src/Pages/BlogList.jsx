import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { getDocs,collection,doc,deleteDoc } from "firebase/firestore"

export default function BlogList(){
    const {currentUser,logout} = useAuth()
    const [blogs,setBlogs] = useState([])
    const [loading,setLoading] = useState(true)

   

    useEffect(()=>{
         async function fetchBlog() {
            try {
                const query = await getDocs(collection(db,'blogs'))
                const blogsdata = query.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }))
                setBlogs(blogsdata)
            } catch (error) {
                console.error("Error fetching blogs:",error)
            }finally{
                setLoading(false)
            }
        }

        fetchBlog()  
    },[])

    async function handleDelete(id){
        if(window.confirm('Are you sure you want to delete this post')){
            try {
                await deleteDoc(doc(db,'blogs',id))
                setBlogs(blogs.filter(b=>b.id !== id))
            } catch (error) {
                  console.error("Error Deleting document:",error)
            }
        }
    }

    async function handleLogout() {
        try {
            await logout()
        } catch (error) {
            console.error('Error on logout',error)
        }
    }
    const style = {
        wrapper: {
            padding: '40px 20px',
            maxWidth: '850px',
            margin: '0 auto',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            color: '#2d3748'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '20px',
            borderBottom: '1px solid #ff5050',
            marginBottom: '12px'
        },
        title: {
            fontSize: '28px',
            fontWeight: '700',
            color: '#1a202c',
            margin: 0
        },
        userBadge: {
            marginRight: '15px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#4a5568',
            backgroundColor: '#edf2f7',
            padding: '6px 12px',
            borderRadius: '20px'
        },
        logoutBtn: {
            padding: '6px 14px',
            cursor: 'pointer',
            fontSize: '14px',
            backgroundColor: 'transparent',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            color: '#718096',
            transition: 'all 0.2s'
        },
        createBtn: {
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: '600',
            backgroundColor: '#565656',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(49, 130, 206, 0.2)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
        },
        card: {
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '10px',
            marginBottom: '20px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        },
        blogTitle: {
            fontSize: '22px',
            color: '#2d3748',
            marginTop: 0,
            marginBottom: '10px'
        },
        blogContent: {
            color: '#4a5568',
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '16px'
        },
        metaText: {
            color: '#a0aec0',
            fontSize: '13px',
            display: 'block',
            marginBottom: '12px'
        },
        actionArea: {
            display: 'flex',
            gap: '12px',
            marginTop: '15px',
            borderTop: '1px solid #f7fafc',
            paddingTop: '12px'
        },
        editBtn: {
            cursor: 'pointer',
            backgroundColor: '#edf2f7',
            border: 'none',
            padding: '6px 14px',
            borderRadius: '6px',
            color: '#2b6cb0',
            fontWeight: '500',
            fontSize: '14px'
        },
        deleteBtn: {
            cursor: 'pointer',
            backgroundColor: '#f7efed',
            border: 'none',
            padding: '6px 14px',
            borderRadius: '6px',
            color: '#e53e3e',
            fontWeight: '500',
            fontSize: '14px'
        },
        statusMessage: {
            textAlign: 'center',
            color: '#718096',
            fontSize: '16px',
            marginTop: '40px'
        }
    }

    return( 
        <div style={style.wrapper}>
            <div style={style.header}>
                <h1 style={style.header}>Welcome to Your Feed</h1>
                <div>
                    <span style={style.userBadge}>👤{currentUser?.email}</span>
                    <button onClick={handleLogout} style={style.logoutBtn}>Logout</button>
                </div>
            </div>

            <hr />
            <div style={{ margin: "20px 0" }}>
                <Link to='/add'>
                    <button style={style.createBtn}>➕Create New Post</button>
                </Link>
            </div>


            {loading?(
                <p style={style.statusMessage}>Loading blogs...</p>
            ): blogs.length===0? (
                <p style={style.statusMessage}>No blog posts found. Write your very first blog!</p>
            ):
            (
                <div>
                    {blogs.map(blog=>(
                        <div key={blog.id} style={style.card}>
                            <h3 style={style.blogTitle}>{blog.title}</h3>
                            <p style={style.blogContent}>{blog.content}</p>
                            <small style={style.metaText}>Posted By: {blog.authorEmail}</small>

                            {currentUser?.uid === blog.authorId && (
                                <div style={style.actionArea}>
                                    <Link to={`/edit/${blog.id}`} style={{ textDecoration: 'none' }}>
                                        <button style={style.editBtn} >Edit</button>
                                    </Link>

                                    <button onClick={()=>handleDelete(blog.id)} style={style.deleteBtn}>Delete</button>
                                </div>
                            )}
                        
                        
                        </div>
                    ))}
                </div>
            )}








 
        </div>
            
    )
}