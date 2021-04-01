import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'carbon-components-react';

const DashCard = ({ children }) => {
    return (
        <div className="dash-card">
            {children}
        </div>
    );
}

DashCard.propTypes = {
    children: PropTypes.node
}

const ModemCard = (props) => {
    return (
        <div className="modem-card">
            <div className="modem-card__header">
                {props.icon}
                <h3>{props.modemType}</h3>
            </div>
            <div className="modem-card__body">
                <p>{props.IMEI}</p>
            </div>
            <div className="modem-card__footer">
                <Button kind="secondary">Details</Button>
                <Button kind="primary">Logs</Button>
            </div>
        </div>
    );
}

ModemCard.propTypes = {
    icon: PropTypes.node,
    modemType: PropTypes.string,
    IMEI: PropTypes.string

}

export { DashCard, ModemCard };