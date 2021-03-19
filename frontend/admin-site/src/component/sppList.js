import React from 'react'
export default class sppList extends React.Component{
    render(){
        return(
            <div className="card col-sm-12 my-1">
                <div className="card-body row">
                    <div className="col-sm-10">
                        {/* description */}
                        <h5 className="text-bold">Tahun: {this.props.tahun}</h5>
                        <h6 className="text-danger">Nominal: {this.props.nominal}</h6>
                    </div>
                    <div className="col-sm-2">
                        {/* action */}
                        <button className="btn btn-sm btn-primary btn-block"
                            onClick={this.props.onEdit}>
                            Edit
                        </button>
                        <button className="btn btn-sm btn-danger btn-block"
                            onClick={this.props.onDrop}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}