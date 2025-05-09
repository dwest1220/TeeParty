import { useNavigate } from "react-router-dom"


export const Welcome = () => {
    const navigate = useNavigate()

    return (
        <div>
            <h1>
                <span>Welcome to</span>
                <span>TeeParty</span>
            </h1>
            <div>The One Stop Shop 'Fore' All Golfers</div>
            <div>
                <button
                    className="btn-primary"
                    onClick={() => {
                        navigate('/courses')
                    }}
                >
                    Courses
                </button>
                <button
                    className="btn-primary"
                    onClick={(() => {
                        navigate(`/teetimes`)
                    })}
                >TeeTimes
                </button>
            </div>
        </div>
    )
}