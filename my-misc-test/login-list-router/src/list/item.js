import React from 'react'
import { Link } from 'react-router-dom'

class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var key = this.props.match.params.uuid;
        var name = this.props.location.query.name;
        return (
            <div>
                <h1>详情-{name}</h1>
                <h2>结果: {key}</h2>
                <Link to='/list'>Back</Link>
            </div>
        )
    }
}

export default Item