import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const getLastDayOfMonth = (year: number, month: number) => {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
};

//月次
const MonthlyChart = () => {
  const currentDate = dayjs();
  const currentYear = currentDate.year();
  const currentMonth = currentDate.month() + 1;
  const [year, setYear] = React.useState<number>(currentYear);
  const [month, setMonth] = React.useState<number>(currentMonth);
  const lastDate = getLastDayOfMonth(year, month);

  const labels = Array.from({ length: lastDate }, (_, i) => i + 1);
  const data = {
    labels,
    datasets: [
      {
        type: "line" as const,
        label: "最高気温",
        data: labels.map(() => faker.number.int({ min: 15, max: 24 })),
        backgroundColor: "rgba(255, 49, 48, 1)",
        borderColor: "rgba(255, 49, 48, 1)",
        borderWidth: 1,
        yAxisID: "y2",
      },
      {
        type: "bar" as const,
        label: "常同行動合計時間",
        data: labels.map(() => faker.number.int({ min: 0, max: 24 })),
        backgroundColor: "#007AFF",
        yAxisID: "y1",
      },
    ],
  };

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    console.log(newDate);
    if (!newDate) return;
    setYear(newDate.year());
    setMonth(newDate.month() + 1);
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      y1: {
        label: "合計時間",
        type: "linear" as const,
        beginAtZero: true,
        position: "left" as const,
        title: {
          display: true,
          text: "合計時間",
        },
      },
      y2: {
        type: "linear" as const,
        beginAtZero: true,
        position: "right" as const,
        title: {
          display: true,
          text: "気温",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        title: {
          display: true,
          text: "日",
        },
      },
    },
  };

  return (
    <div>
      <DatePicker
        views={["year", "month"]}
        format="YYYY年MM月"
        value={dayjs(`${year}-${month}`)}
        onMonthChange={(newDate) => handleDateChange(newDate)}
        className="mb-10"
      />
      <div className="flex justify-center h-[500px]">
        <Chart options={options} data={data} type="line" />
      </div>
    </div>
  );
};

const YearlyChart = () => {
  const currentDate = dayjs();
  const currentYear = currentDate.year();
  const [year, setYear] = React.useState<number>(currentYear);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "合計時間",
        },
      },
      x: {
        title: {
          display: true,
          text: "日",
        },
      },
    },
  };
  const labels = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "常同行動合計時間",
        data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
        backgroundColor: "#007AFF",
      },
    ],
  };
  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    console.log(newDate);
    if (!newDate) return;
    setYear(newDate.year());
  };
  return (
    <div>
      <DatePicker
        views={["year"]}
        format="YYYY年"
        value={dayjs(`${year}`)}
        onChange={(newDate) => handleDateChange(newDate)}
        className="mb-10"
      />
      <div className="flex justify-center h-[500px]">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

const BarChart = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="bg-white rounded-lg p-10 m-16">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="月次" />
            <Tab label="年次" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <MonthlyChart />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <YearlyChart />
        </TabPanel>
      </Box>
    </div>
  );
};
export default BarChart;
