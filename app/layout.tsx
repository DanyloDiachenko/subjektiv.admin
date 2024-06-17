import "../styles/style.scss";
import "react-tooltip/dist/react-tooltip.css";
import { LayoutProps } from "./layout.props";

const RootLayout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <html lang="en" data-bs-theme="light">
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700"
                />
            </head>
            {children}
        </html>
    );
};

export default RootLayout;
