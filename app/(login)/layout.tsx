import Link from "next/link";
import Image from "next/image";

import { LayoutProps } from "../layout.props";

const RootLayout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <body className="app-blank bgi-size-cover bgi-attachment-fixed bgi-position-center bgi-no-repeat">
            <div
                className="d-flex flex-column flex-root"
                style={{ backgroundImage: "url('/media/auth/bg4.jpg')" }}
            >
                <div className="d-flex flex-column flex-column-fluid flex-lg-row">
                    <div className="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
                        <div className="d-flex flex-center flex-lg-start flex-column">
                            <Link href="#" className="mb-7">
                                <Image
                                    alt="Logo"
                                    src="/media/logo.png"
                                    width={238}
                                    height={49}
                                />
                            </Link>
                            <h2 className="text-white fw-normal m-0">
                                the whole art world in one app
                            </h2>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </body>
    );
};

export default RootLayout;
