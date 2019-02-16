import React, { Component } from 'react'
import './settings.css'
import RequireLogin from '../auth/RequireLogin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faSave } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'universal-cookie';
import Axios from 'axios';
import qs from "querystring"

export default class Settings extends Component {

    constructor(props) {
        super(props)

        this.cookies = new Cookies();
        const user = this.cookies.get("user")

        this.state = {
            ...user.socialmedia,
            email: user.email
        }
    }


    onChangeName(service, name) {
        this.setState({
            [service]: name
        })
    }

    onChangeVisible(service, value) {
        this.setState({
            [`${service}_public`]: value
        })
    }

    save(){
        Axios.post("/user", qs.stringify({
            ...this.state
        })).then(res => {

        })
    }


    render() {
        return (
            <>
                <RequireLogin />
                <div id="settingspanel">
                    <h1>Settings</h1>
                    <div id="settingspanels">
                        {
                            ["twitter", "discord", "furaffinity", "telegram", "skype"].map((v, i) => <SocialmediaSettingsPanel
                                name={this.state[v]}
                                visible={this.state[`${v}_public`]}
                                onChangeName={value => this.onChangeName(v, value)}
                                onChangeVisible={value => this.onChangeVisible(v, value)}
                                key={i}
                                service={v}
                            />)
                        }
                        <SettingsPanel
                            name={this.state.email}
                            onChangeName={value => this.onChangeName("email", value)}
                            service={"email"}
                        />
                    </div>
                    <button onClick={evt => this.save()}><FontAwesomeIcon icon={faSave} /></button>
                </div>
            </>
        )
    }
}

const SettingsPanel = props => {
    return (
        <>
            <label htmlFor={`${props.service}_name`}>{props.service[0].toUpperCase() + props.service.substr(1)}</label>
            <input
                id={`${props.service}_name`}
                type="text" value={props.name}
                onChange={evt => props.onChangeName(evt.target.value)}
            />
        </>
    )
}

const SocialmediaSettingsPanel = props => {
    return (
        <>
            <label htmlFor={`${props.service}_name`}>{props.service[0].toUpperCase() + props.service.substr(1)}</label>
            <input
                id={`${props.service}_name`}
                type="text" value={props.name || ""}
                onChange={evt => props.onChangeName(evt.target.value)}
            />
            <input
                className="hidden"
                id={`${props.service}_check`}
                type="checkbox" checked={props.visible}
                onChange={evt => props.onChangeVisible(evt.target.checked)}
            />
            <label htmlFor={`${props.service}_check`}>
                {<FontAwesomeIcon className="fabutton" icon={props.visible ? faEye : faEyeSlash} />}
            </label>
        </>
    )
}