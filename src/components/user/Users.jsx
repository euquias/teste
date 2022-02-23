import React, { Componet } from "react";
import axios from 'axios'
import Main from "../template/Main";



const baseUrl = 'https://gist.githubusercontent.com/alencarlucas/4cd794e2e44bbe926ea4ab28da2fa3e7/raw/2c304035b03c3c5e2e708e4e82c49a42899e47ed/fiter.json'

const initialState = {
    user: {
        nome: "",
        cargo: "",
        telefone: "",
        foto: ""
    },
    list:[]
}

export default class User extends Componet{
    state = {...initialState}

    clear(){
        this.setState({ user: initialState.user })
    }
   /*  save(){
        const user =this.state.user
        const method = user.id 
        const url = user.id `${baseUrl}/${user.id}` 
        axios[method] (url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    } */

        

        render(){
            console.log(this.state.list)
           
        }
}