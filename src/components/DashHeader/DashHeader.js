import React from 'react';
import PropTypes from 'prop-types';

const DashHeader = (props) => {
    return (
        <div className={props.className + " dash-header"}>
            <h2><strong>{props.title}</strong> {props.subtitle}</h2>
            <p>{props.description}</p>
        </div>
    );
}

DashHeader.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string
}

export default DashHeader;