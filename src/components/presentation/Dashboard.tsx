import './Dashboard.modules.scss'

export function Dashboard() {
    return (
        <>
            <header>
                <h1>Join 360</h1>
                <span className='description'>Key Metrics at a Glance</span>
            </header>
            <div className="container">
                <div className="card-container">
                    <div className="single-row row-1">
                        <div className="card">

                            <div>
                                <span className="count">1</span>
                                <span className='category'>To Do</span>
                            </div>
                        </div>
                        <div className="card">

                        </div>
                    </div>

                    <div className="single-row row-2">
                        <div className="card">

                        </div>
                    </div>

                    <div className="single-row row-3">
                        <div className="card">

                        </div>
                        <div className="card">

                        </div>
                        <div className="card">

                        </div>
                    </div>
                </div>
                <div className="user-container">
                    <span className="greeting">Good morning,</span>
                    <span className="name">Name</span>
                </div>
            </div>
        </>
    )
}