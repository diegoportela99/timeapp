import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDB } from "../config/config";
import { Chart, registerables } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

Chart.register(...registerables);

interface Task {
  id: string;
  input: string;
  difficulty: string;
  description: string;
  status: string;
}

const AnalyticsDisplay: React.FC = () => {
  const [taskData, setTaskData] = useState<{
    barData: {
      labels: string[];
      datasets: {
        label: string;
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
        hoverBackgroundColor: string;
        hoverBorderColor: string;
        data: number[];
      }[];
    };
  }>({
    barData: {
      labels: [],
      datasets: [
        {
          label: "Completed Tasks",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
          hoverBorderColor: "rgba(75, 192, 192, 1)",
          data: [],
        },
        {
          label: "Pending Tasks",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
          hoverBorderColor: "rgba(255, 99, 132, 1)",
          data: [],
        },
      ],
    },
  });

  useEffect(() => {
    // Access the 'tasks' collection in Firestore
    const tasksCollection = collection(firestoreDB, "tasks");

    const getDifficulty = (task: { difficulty: any }) => {
      switch (task.difficulty) {
        case "red.500":
          return 30;
        case "orange.500":
          return 10;
        case "green.500":
          return 5;
        default:
          return 0;
      }
    };

    // Fetch all tasks from Firestore and sort by difficulty
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(tasksCollection);
        const tasks: Task[] = [];

        querySnapshot.forEach((doc) => {
          tasks.push(doc.data() as Task);
        });

        // Sort tasks by difficulty in ascending order
        tasks.sort((a, b) => {
          const difficultyA = getDifficulty(a);
          const difficultyB = getDifficulty(b);
          return difficultyA - difficultyB;
        });

        const barData = {
          labels: [] as string[],
          datasets: [
            {
              label: "Completed Tasks",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
              hoverBorderColor: "rgba(75, 192, 192, 1)",
              data: [] as number[],
            },
            {
              label: "Pending Tasks",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
              hoverBorderColor: "rgba(255, 99, 132, 1)",
              data: [] as number[],
            },
          ],
        };

        tasks.forEach((task) => {
          const difficulty = getDifficulty(task);

          barData.labels.push(task.input); // Assuming 'input' is the label for tasks
          if (task.status === "complete") {
            barData.datasets[0].data.push(difficulty); // Completed task
            barData.datasets[1].data.push(0); // Pending task
          } else {
            barData.datasets[0].data.push(0); // Completed task
            barData.datasets[1].data.push(difficulty); // Pending task
          }
        });

        setTaskData({
          barData,
        });
      } catch (error) {
        console.error("Error fetching tasks from Firestore:", error);
      }
    };

    fetchData(); // Fetch tasks when the component mounts
  }, []); // The empty dependency array ensures this effect runs once on mount

  return (
    <Box mt={4}>
      <div>AnalyticsDisplay</div>
      <div className="h-screen" style={{ backgroundColor: "rgba(192, 192, 192, 0.3)" }}>
        <Bar
          data={taskData.barData}
          options={{
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </Box>
  );
};

export default AnalyticsDisplay;
