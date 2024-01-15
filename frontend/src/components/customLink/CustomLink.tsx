import React from "react";
import styles from "./CustomLink.module.scss";
import { Link, LinkProps } from "react-router-dom";

const CustomLink: React.FC<LinkProps> = (props) => {
	return <Link {...props} className={`${styles.link} ${props.className}`} />;
};

export default CustomLink;
