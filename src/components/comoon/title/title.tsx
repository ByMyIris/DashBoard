import React from "react";

import styles from './title.module.css';

interface TitleProps {
    className?: string;
    children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ className=styles.title, children }) => {
    return <h1 className={className}>{children}</h1>
};

export default Title;