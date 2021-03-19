import React from 'react'
import $ from 'jquery'
export default class historyList extends React.Component {
    convertTime = time => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth())+1}/${date.getFullYear()}`
    }
    tutup = () => {
        $(`#modalDetail${this.props.id_pembayaran}`).modal("hide")
    }
    render() {
        return (
            <div>
                <div className="card col-sm-12 my-1">
                    <div className="card-body row">
                        <div className="col-lg-4 col-sm-12">
                            <small className="text-info">Nama Siswa</small>
                            <h6>{this.props.nama}</h6>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <small className="text-info">NISN</small>
                            <h6>{this.props.nisn}</h6>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-info">Jumlah Bayar</small>
                            <h6 className="text-danger">Rp {this.props.jumlah_bayar}</h6>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-bold text-info">
                                Tanggal Bayar: {this.convertTime(this.props.tgl_bayar)}
                            </small>
                            <button className="btn btn-sm btn-block btn-success" data-toggle="modal"
                                data-target={`#modalDetail${this.props.id_pembayaran}`}>
                                Details
                            </button>
                        </div>
                    </div>
                </div>
                {/* modal */}
                <div className="modal fade" id={`modalDetail${this.props.id_pembayaran}`}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5>Detail Pembayaran</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <h5>Nama Siswa : {this.props.nama}</h5>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Petugas</label>
                                        <div className="col-sm-10">
                                            <label className="form-control">{this.props.nama_petugas}</label>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">ID SPP</label>
                                        <div className="col-sm-10">
                                            <label className="form-control">{this.props.id_spp}</label>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Tanggal Bayar</label>
                                        <div className="col-sm-10">
                                            <label className="form-control">{this.convertTime(this.props.tgl_bayar)}</label>
                                        </div>
                                    </div>
                                    <button className="btn btn-danger" onClick={() => this.tutup()}>Tutup</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}