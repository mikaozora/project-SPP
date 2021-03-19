import React from 'react'
import Navbar from '../component/navbar'
import { base_url } from '../Config'
import $ from 'jquery'
import axios from 'axios'
import SppList from '../component/sppList'

export default class spp extends React.Component{
    constructor(){
        super()
        this.state = {
            spp : [],
            token: "",
            tahun: 0,
            nominal: 0,
            id_spp: 0,
            action: ""
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getSpp = () => {
        let url = base_url + "/spp"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ spp: response.data.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }
    Add = () => {
        $("#modal_spp").modal("show")
        this.setState({
            action: "insert",
            tahun: 0,
            nominal: 0,
            id_spp: 0
        })
    }

    Edit = selectedItem => {
        $("#modal_spp").modal("show")
        this.setState({
            action: "update",
            id_spp : selectedItem.id_spp,
            tahun: selectedItem.tahun,
            nominal : selectedItem.nominal
        })
    }

    saveSpp = event => {
        event.preventDefault()
        $("#modal_spp").modal("show")
        let sendData = {
            id_spp : this.state.id_spp,
            tahun: this.state.tahun,
            nominal: this.state.nominal
        }
        let url = base_url + "/spp"
        if(this.state.action === "insert"){
            axios.post(url, sendData, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSpp()
            })
        }else if(this.state.action === "update"){
            axios.put(url, sendData, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSpp()
            })
        }
        $("#modal_spp").modal('hide')
    }
    dropSpp = selectedItem => {
        if (window.confirm("Apakah Anda yakin menghapus data ini?")) {
            let url = base_url + "/spp/" + selectedItem.id_spp
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getSpp()
                })
                .catch(error => console.log(error))
        }

    }
    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    componentDidMount() {
        this.getSpp()
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">SPP List</h3>
                    <div className="row">
                        {this.state.spp.map(item => (
                            <SppList
                                key={item.id_spp}
                                tahun={item.tahun}
                                nominal={item.nominal}
                                onEdit={() => this.Edit(item)}
                                onDrop={() => this.dropSpp(item)}
                            />
                        ))}
                    </div>
                    <button className="btn btn-dark" onClick={() => this.Add()}>
                        Tambah SPP
                    </button>
                </div>
                {/* modal */}
                <div className="modal fade" id="modal_spp">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h4>Form Spp</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveSpp(ev)}>
                                    Tahun
                                    <input type="text" className="form-control mb-1" name="tahun"
                                        value={this.state.tahun}
                                        onChange={this.bind}
                                        required
                                    />
                                    Nominal
                                    <input type="text" className="form-control mb-1" name="nominal"
                                        value={this.state.nominal}
                                        onChange={this.bind}
                                        required
                                    />
                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}