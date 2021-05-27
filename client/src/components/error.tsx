import React from "react";
import "./error.scss";

export default function Error({ message }: { message: string }) {
  return <p className="error">{message}</p>;
}
