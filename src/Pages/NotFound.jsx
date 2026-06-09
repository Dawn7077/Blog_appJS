import {Link} from 'react-router-dom'
export default function NotFound(){
    return(
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>404 Not Found</h1>
            <p>This page dosent exist</p>
            <Link to='/'>Home</Link>
        </div>
    )
}