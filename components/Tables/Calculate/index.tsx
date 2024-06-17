import styles from "./styles.module.scss";
import { CalculateTableProps } from "./calculate.props";
import { formatEnumValue } from "@/helpers/formatEnumValue";
import { NothingFound } from "@/components/NothingFound";

export const CalculateTable = ({
    operatorPriceData,
}: CalculateTableProps): JSX.Element => {
    return (
        <>
            <div className={`card-body py-4 ${styles.table}`}>
                {operatorPriceData.length ? (
                    <table
                        className={`table align-middle table-row-dashed fs-6 gy-5`}
                    >
                        <thead>
                            <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                                <th className={styles.operatorTh}>OPERATOR</th>
                                <th>PRICE</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 fw-semibold">
                            {operatorPriceData.map((item, index) => (
                                <tr key={index}>
                                    <td className={styles.operatorTd}>
                                        {formatEnumValue(item.operator)}
                                    </td>
                                    <td>€{(item.price / 100).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <NothingFound />
                )}
            </div>
        </>
    );
};
