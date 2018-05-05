import React from "react";

const Button = props => {
  const { handleDismiss, objectID, children } = props;
  //alternatively: const buttonTitle = props.children
  // and then: return <button onClick={() => handleDismiss(object_id)}>{buttonTitle}</button>;

  return <button onClick={() => handleDismiss(objectID)}>{children}</button>;
};

export default Button;
