import React from "react";
import "./NotefulForm.css";
import ErrorBoundry from "../ErrorBoundry";
import PropType from 'prop-types';
export default function NotefulForm(props) {
  const { className, ...otherProps } = props;
  return (
    <ErrorBoundry>
      <form
        className={["Noteful-form", className].join(" ")}
        action="#"
        {...otherProps}
      />
    </ErrorBoundry>
  );
}

NotefulForm.propType = {
  className: PropType.string.isRequired
}
