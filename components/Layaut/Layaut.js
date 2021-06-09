import Navbar from '../Navbar/Navbar'
export default function Layaut({children}) {
    return (
        <div className="container">
            <Navbar/>
            {children}
        </div>
    )
}
