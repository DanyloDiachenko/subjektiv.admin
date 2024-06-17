import { formatDate } from "@/helpers/formatDate";
import { LoginSessionTableProps } from "./module.props";
import styles from "./styles.module.scss";

export const UserLoginSessionTable = ({
    loginSessions,
}: LoginSessionTableProps): JSX.Element => {
    return (
        <div className={styles.tableWrapper}>
            <table
                className={`table align-middle table-row-dashed fs-6 ${styles.table}`}
            >
                <thead>
                    <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                        <th className={styles.nameArtwork}>DATE</th>
                        <th className={styles.category}>STATUS</th>
                        <th className={styles.status}>LOCATION</th>
                        <th className={styles.owner}>DEVICE</th>
                        <th className={styles.price}>LOGIN ERROR CAUSES</th>
                        <th className={styles.purchaseRequests}>IP ADDRESS</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 fw-semibold">
                    {loginSessions &&
                        loginSessions.map((session, index) => (
                            <tr key={index}>
                                <td>{formatDate(session.created_at)}</td>
                                <td className={styles.status}>
                                    <span
                                        className={
                                            session.status === "SUCCESS"
                                                ? styles.success
                                                : styles.error
                                        }
                                    >
                                        {session.status}
                                    </span>
                                </td>
                                <td>{session.location}</td>
                                <td>{session.device}</td>
                                <td>{session.device}</td>
                                <td>{session.ip}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};
