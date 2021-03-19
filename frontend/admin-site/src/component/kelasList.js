import React from 'react'
export default class kelasList extends React.Component{
    render(){
        return(
            <div className="card col-sm-12 my-1">
                <div className="card-body row">
                    <div className="col-sm-10">
                        {/* description */}
                        <h5 className="text-bold">Nama Kelas: {this.props.nama_kelas}</h5>
                        <h6>kompetensi_kelas: {this.props.kompetensi_keahlian}</h6>
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