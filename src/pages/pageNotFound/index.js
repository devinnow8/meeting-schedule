import React, { useEffect } from "react"
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router-dom";

const PageNotFound = ({setNotFound}) => {
    const navigate = useNavigate();

    useEffect(()=>{
        setNotFound(true)
    },[])

    const localData = localStorage.getItem('userToken')
    const dashboardcall = () => {
        if (localData) {
            setNotFound(false)
            navigate("/home")
        } else {
            navigate("/login")
        }
    }

    return (
        <div className="error-header">
            <h3>Page not found!</h3>

            <button
                className="back-btn d-flex align-items-center"
                onClick={() => dashboardcall()}
            >
                <IoIosArrowBack  className="me-1" />
                To ScheduleSense
            </button>
        </div>
    )
}
export default PageNotFound