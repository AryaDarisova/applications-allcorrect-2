const styles = {
    blockCenter: {
        textAlign: 'center'
    },

    blockView: {
        border: '1px solid #ccc',
        padding: '.5rem 1rem',
        borderRadius: '5px',
        marginLeft: '15rem',
        marginRight: '15rem',
        marginBottom: '6rem',
        marginTop: '6rem'
    }
}

export default function Login(props) {
    return(
        <div className="wrapper" style={styles.blockView}>
            <h2 style={styles.blockCenter}>Please Log In</h2>
            <br />
            <form onSubmit={props.authLogIn}>
                <div className="row">
                    <div className="col-sm-12">
                        <label htmlFor="inputAuthLogin" className="form-label"><strong>Enter Login:</strong></label>
                        <input className="form-control" id="inputAuthLogin" name="inputAuthLogin" />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-sm-12">
                        <label htmlFor="inputAuthPassword" className="form-label"><strong>Enter Password:</strong></label>
                        <input className="form-control" id="inputAuthPassword" type="password" name="inputAuthPassword" />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-sm-12" style={styles.blockCenter}>
                        <button className="btn btn-primary">Log In</button>
                    </div>
                </div>
            </form>
        </div>
    )
}