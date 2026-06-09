import { useState } from "react";
import { db } from "../firebase/config"; // Import our database tool
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function AddBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { currentUser } = useAuth(); // We need this to tag WHO wrote the post
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        setLoading(true);
        try {
            // 1. Point to the "blogs" collection folder in Firestore
            const blogsFolder = collection(db, "blogs");

            // 2. Push the new blog post object into that folder
            await addDoc(blogsFolder, {
                title: title,
                content: content,
                authorId: currentUser.uid,       // Ties the post to the logged-in user's ID
                authorEmail: currentUser.email,   // Shows who wrote it on the feed
                createdAt: serverTimestamp()      // Gives us a clean Google server timestamp
            });

            // 3. Send the user back to the home feed to see their post
            navigate("/");
        } catch (error) {
            console.error("Error adding blog post:", error);
            alert("Failed to create blog post.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
            <h2>Create a New Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <input 
                        type="text" 
                        placeholder="Blog Title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <textarea 
                        placeholder="Write your story here..." 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows="8"
                        style={{ width: "100%", padding: "10px", fontSize: "14px" }}
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ padding: "10px 20px", cursor: "pointer" }}
                >
                    {loading ? "Publishing..." : "Publish Blog"}
                </button>
            </form>
        </div>
    );
}

export default AddBlog;