import "./messages-tab.scss";

export interface ITab {
    id: number;
    title: string;
    type: string;
}
interface IProps {
    activeTab: ITab;
    onChangeTab: (type: string) => void;
    tabs: ITab[];
}
const MessagesTab = ({ activeTab, onChangeTab, tabs }: IProps) => {
    return (
        <nav className="messages-tabs">
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    className={`messages-tabs__item ${
                        activeTab?.id === tab.id
                            ? "text-white  active"
                            : "text-white opacity-25"
                    }`}
                    onClick={() => onChangeTab(tab.type)}
                >
                    {tab.title}
                </div>
            ))}
        </nav>
    );
};

export default MessagesTab;
