import { Card, Row } from "antd";


const Dashboard = () => {
    const [user] = useAuthState(auth);

    // const sampleTransactions = [
    // {
    //   name: "Pay day",
    //   type: "income",
    //   date: "2023-01-15",
    //   amount: 2000,
    //   tag: "salary",
    // },
    // {
    //   name: "Dinner",
    //   type: "expense",
    //   date: "2023-01-20",
    //   amount: 500,
    //   tag: "food",
    // },
    // {
    //   name: "Books",
    //   type: "expense",
    //   date: "2023-01-25",
    //   amount: 300,
    //   tag: "education",
    // },
    // ];


    const processChartData = () => {
        const balanceData = [];
        const spendingData = {};

        transactions.forEach((transaction) => {
            const monthYear = moment(transaction.date).format("MMM YYYY");
            const tag = transaction.tag;

            if (transaction.type === "income") {
                if (balanceData.some((data) => data.month === monthYear)) {
                    balanceData.find((data) => data.month === monthYear).balance +=
                        transaction.amount;
                } else {
                    balanceData.push({ month: monthYear, balance: transaction.amount });
                }
            } else {
                if (balanceData.some((data) => data.month === monthYear)) {
                    balanceData.find((data) => data.month === monthYear).balance -=
                        transaction.amount;
                } else {
                    balanceData.push({ month: monthYear, balance: -transaction.amount });
                }

                if (spendingData[tag]) {
                    spendingData[tag] += transaction.amount;
                } else {
                    spendingData[tag] = transaction.amount;
                }
            }
        });

        const spendingDataArray = Object.keys(spendingData).map((key) => ({
            category: key,
            value: spendingData[key],
        }));

        return { balanceData, spendingDataArray };
    };

    const { balanceData, spendingDataArray } = processChartData();










    const balanceConfig = {
        data: balanceData,
        xField: "month",
        yField: "balance",
    };

    const spendingConfig = {
        data: spendingDataArray,
        angleField: "value",
        colorField: "category",
    };

    function reset() {
        console.log("resetting");
    }
    const cardStyle = {
        boxShadow: "0px 0px 30px 8px rgba(227, 227, 227, 0.75)",
        margin: "2rem",
        borderRadius: "0.5rem",
        minWidth: "400px",
        flex: 1,
    };



    return (
        <div className="dashboard-container">
            <Header />
            {loading ? (
                <Loader />
            ) : (
                <>



                    {transactions.length === 0 ? (
                        <NoTransactions />
                    ) : (
                        <>
                            <Row gutter={16}>
                                <Card bordered={true} style={cardStyle}>
                                    <h2>Financial Statistics</h2>
                                    <Line {...{ ...balanceConfig, data: balanceData }} />
                                </Card>

                                <Card bordered={true} style={{ ...cardStyle, flex: 0.45 }}>
                                    <h2>Total Spending</h2>
                                    {spendingDataArray.length == 0 ? (
                                        <p>Seems like you haven't spent anything till now...</p>
                                    ) : (
                                        <Pie {...{ ...spendingConfig, data: spendingDataArray }} />
                                    )}
                                </Card>
                            </Row>
                        </>
                    )}
                    <TransactionSearch
                        transactions={transactions}
                        exportToCsv={exportToCsv}
                        fetchTransactions={fetchTransactions}
                        addTransaction={addTransaction}
                    />
                </>
            )}
        </div>
    );
};
export default Dashboard;
