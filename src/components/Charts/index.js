import React from 'react'
import { Line, Pie } from "@ant-design/plots";
import { Transaction } from 'firebase/firestore';

function ChartComponent({ sortedTransactions }) {
    const data = sortedTransactions.map((item) => {
        return { date: item.date, amount: item.amount }
    });

    const spendingData = sortedTransactions.filter(
        (Transaction) => {
            if (Transaction.type == "expense") {
                return { tag: Transaction.tag, amount: Transaction.amount };
            }
        });

    let finalSpendings = spendingData.reduce((acc, obj) => {
        let key = obj.tag;
        if (!acc[key]) {
            acc[!key] = { tag: obj.tag, amount: obj.amount };
        } else {
            acc[key].amount += obj.amount;
        }
        return acc;
    }, {});

    let newSpendings = [
        { tag: "food", amount: 0 },
        { tag: "education", amount: 0 },
        { tag: "office", amount: 0 },
    ];

    spendingData.forEach((item) => {
        if (item.tag == "food") {
            newSpendings[0].amount += item.amount;
        } else if (item.tag == "education") {
            newSpendings[1].amount += item.amount;
        }
        else {
            newSpendings[2].amount += item.amount
        }
    })


    console.log("spending array", Object.values(finalSpendings));
    const config = {
        data: data,
        width: 500,
        autoFit: true,
        xField: 'date',
        yField: 'amount',

    };

    const spendingConfig = {
        data: newSpendings,
        width: 500,
        angleField: "amount",
        colorField: "tag",
    };

    let chart;
    let pieChart;
    return (
        <div className='charts-wrapper'>
            <div>
                <h2 style={{ marginTop: 0 }}>Your Analytics</h2>
                <Line

                    {...config} onReady={(chartInstance) => (chart = chartInstance)} />
            </div>
            <div>
                <h2>Your Spendings</h2>
                <Pie {...spendingConfig}
                    onReady={(chartInstance) => (chart = chartInstance)}
                />
            </div>
        </div>
    )
}

export default ChartComponent;