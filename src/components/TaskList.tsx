import { DeleteIcon, EditIcon, StarIcon } from "@chakra-ui/icons";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  CloseButton,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { SetStateAction, useEffect, useRef, useState } from "react";
import { firestoreDB } from "../config/config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { readEmail } from "../functions";
import Mountain from "./Mountain";

const TaskList = () => {
  // ~~~~~~~~~~~~~~~~~~~ hooks ~~~~~~~~~~~~~~~~~~~~~
  const [loading, setLoading] = useState(false);
  // Just use one list
  const [taskListItems, setTaskListItems] = useState<any>([]);
  // const [incompleteTaskList, setIncompleteTaskList] = useState<any>([]);
  // const [completeTaskList, setCompleteTaskList] = useState<any>([]);
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editID, setEditID] = useState("");
  const [radioDifficulty, setRadioDifficulty] = useState("");
  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [XP, setXP] = useState(0);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~ modal hook ~~~~~~~~~~~~~~~~~~~
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ~~~~~~~~~~~~~~~ input consts ~~~~~~~~~~~~~~~~~~
  const inputLengthMax = 70;
  const descriptionLengthMax = 250;
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const addTask = async (event: any) => {
    event.preventDefault();

    if (radioDifficulty === "") {
      setAlertText("You must choose a difficulty.");
      setDisplayAlert(true);
      return;
    } else {
      setDisplayAlert(false);
    }

    setLoading(true);

    const setID = Math.floor(Math.random() * (1000000 - 10)) + 10;
    console.log("id:   " + setID);

    if (
      input.length > 0 &&
      input.length < inputLengthMax &&
      description.length < descriptionLengthMax
    ) {
      try {
        // Access the 'tasks' collection in Firestore
        const tasksCollection = collection(firestoreDB, "tasks");

        // Add the task to Firestore
        const docRef = await addDoc(tasksCollection, {
          input,
          difficulty: radioDifficulty,
          id: setID,
          description,
          status: "pending",
          username: readEmail(),
        });
        setDisplayAlert(false);

        // Log the Firestore document reference
        console.log("Document written with ID: ", docRef.id);

        // Add the task to your local state or update it as needed
        setTaskListItems((prevState: any) => [
          ...prevState,
          {
            input,
            difficulty: radioDifficulty,
            id: setID,
            description,
            status: "pending",
          },
        ]);
      } catch (error) {
        console.error("Error adding task to Firestore: ", error);
      }
    }

    // Handle other validation checks and alerts here as before

    setInput("");
    setDescription("");
    setRadioDifficulty("");
    setLoading(false);
  };

  const setXpBar = (difficulty: string) => {
    if (difficulty === "red.500") {
      setXP(XP + 30);
    } else if (difficulty === "orange.500") {
      setXP(XP + 10);
    } else {
      setXP(XP + 5);
    }
  };

  const completeTask = async (
    input: any,
    index: any,
    difficulty: any,
    id: any,
    description: any
  ) => {
    try {
      // Update the task status to "complete" in Firestore
      const tasksCollection = collection(firestoreDB, "tasks"); // Make sure it matches your Firestore collection name
      const taskQuery = query(
        tasksCollection,
        where("input", "==", input), // Assuming 'input' is a unique identifier for your tasks
        where("difficulty", "==", difficulty), // Include other unique identifiers if needed
        where("id", "==", id)
      );
      const taskSnapshot = await getDocs(taskQuery);

      if (!taskSnapshot.empty) {
        const taskDoc = taskSnapshot.docs[0]; // Assuming there's only one matching task
        const taskRef = doc(firestoreDB, "tasks", taskDoc.id);

        // Update the task status to "complete"
        await updateDoc(taskRef, { status: "complete" });
      } else {
        console.log("Task not found in Firestore");
      }

      setTaskListItems((prevState: any) => {
        // Map over the current state and update the entry with matching 'id'
        return prevState.map((task: any) => {
          if (task.id === id) {
            return {
              ...task,
              status: "complete",
            };
          }
          return task;
        });
      });

      setXpBar(difficulty);
    } catch (error) {
      console.error("Error updating task status in Firestore:", error);
    }
  };

  useEffect(() => {
    // Access the 'tasks' collection in Firestore
    const tasksCollection = collection(firestoreDB, "tasks");

    // Define the username to filter tasks
    const usernameToFilter = readEmail(); // Replace with the actual username

    // Fetch all tasks from Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          query(tasksCollection, where("username", "==", usernameToFilter))
        );
        const taskData: {
          [x: string]: string;
          id: string;
        }[] = [];
        querySnapshot.forEach((doc) => {
          taskData.push({ id: doc.id, ...doc.data() });
        });
        setTaskListItems(taskData);

        // Calculate total XP based on task difficulties
        let totalXP = 0;
        taskData.forEach((task) => {
          switch (task.difficulty) {
            case "red.500":
              totalXP += 30;
              break;
            case "orange.500":
              totalXP += 10;
              break;
            default:
              totalXP += 5;
              break;
          }
        });

        // Set the XP bar state
        setXP(totalXP);
      } catch (error) {
        console.error("Error fetching tasks from Firestore:", error);
      }
    };

    fetchData(); // Fetch tasks when the component mounts

    return () => {
      // Cleanup logic if needed (e.g., unsubscribing from real-time updates)
    };
  }, []); // The empty dependency array ensures this effect runs once on mount

  const editTask = (id: any, event: any) => {
    event.preventDefault();

    console.log("editing  :  " + id + "  :  " + editInput);

    if (editInput.length > 0 && editInput.length < 50) {
      const arrCopy = [...taskListItems];

      let index = arrCopy.findIndex(function (task) {
        if (id === task.id) return true;
      });

      console.log(`index :  ${index}`);

      arrCopy[index].input = editInput;
      setTaskListItems(arrCopy);
      setDisplayAlert(false);
    }

    if (editInput.length > 50) {
      setDisplayAlert(true);
    }

    setEditInput("");
    setEditID("");
    onClose();
  };

  const cancelEdit = () => {
    setEditInput("");
    onClose();
  };

  const deleteTask = (index: any) => {
    const arrCopy = [...taskListItems];
    arrCopy.splice(index, 1);
    setTaskListItems(arrCopy);
  };

  function triggerDisplayAlert(text: string) {
    return displayAlert ? (
      <Alert status="error" mt={4} color={useColorModeValue("red", "red.200")}>
        <AlertIcon />
        <Box>
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription w={"100%"}>
            {text}
            {/* Too many title characters! Please input fewer characters. */}
          </AlertDescription>
        </Box>
        <CloseButton
          alignSelf="flex-start"
          position="absolute"
          right={1}
          top={1}
          onClick={() => setDisplayAlert(false)}
        />
      </Alert>
    ) : (
      <div></div>
    );
  }

  const EditModal = () => {
    const initialRef = useRef(null);

    return (
      <>
        {/* <IconButton bg={'yellow.500'} icon={<EditIcon />} aria-label={""} onClick={onOpen} /> */}

        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={() => cancelEdit()}
          isCentered
          preserveScrollBarGap
          motionPreset="none"
        >
          <ModalOverlay />
          <ModalContent
            mx={8}
            bg={useColorModeValue("bgLight.100", "bgDark.900")}
          >
            <ModalCloseButton />
            <ModalBody py={4}>
              <FormControl>
                <FormLabel textAlign={"center"}>Update Task</FormLabel>
                <form onSubmit={(event) => editTask(editID, event)}>
                  <Input
                    ref={initialRef}
                    placeholder="Update task"
                    value={editInput}
                    onChange={(event) => setEditInput(event.target.value)}
                  />
                </form>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Button
                colorScheme="blue"
                w={20}
                mr={4}
                onClick={(event) => editTask(editID, event)}
              >
                Save
              </Button>
              <Button w={20} onClick={() => cancelEdit()}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  const DifficultyCircle = (props: any) => (
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );

  const addAndEdit = (id: any) => {
    if (editID === "") {
      setEditID(id);
    }
    onOpen();
  };

  console.log(taskListItems);

  const taskList = () =>
    taskListItems.length > 0 ? (
      <Tabs mt="2%" w="100%" align="center" isFitted>
        <TabList>
          <Tab>Active</Tab>
          <Tab>Completed</Tab>
          {/* <Tab>Expired</Tab> */}
        </TabList>
        {/* <TabPanels> */}
        <TabPanels
          sx={{ overflowY: "hidden" }}
          overflowY={"scroll"}
          overscrollBehavior={"outside"}
          maxH={{ base: "60vh", lg: 1400 }}
        >
          <TabPanel>
            {taskListItems
              .filter((task: any) => task.status === "pending")
              .map((task: any, index: number) => (
                <VStack key={index} mt={2}>
                  <Flex flexDir={"row"} mb={2} w="100%">
                    <Container w={"100%"} textAlign={"left"} maxW={"100%"}>
                      <HStack>
                        <DifficultyCircle color={task.difficulty} />
                        <Container
                          w={"100%"}
                          textAlign={"left"}
                          maxW={"100%"}
                          wordBreak={"break-all"}
                        >
                          {task.input}
                        </Container>
                      </HStack>

                      <Container
                        w={"100%"}
                        textAlign={"left"}
                        maxW={"100%"}
                        wordBreak={"break-all"}
                        mt={2}
                      >
                        {task.description}
                      </Container>

                      <HStack
                        w={"100%"}
                        my={2}
                        mt={4}
                        justifyContent={"center"}
                        spacing={{ base: "10px", lg: "10px" }}
                        h={8}
                      >
                        <IconButton
                          aria-label={""}
                          bg={"green.600"}
                          icon={<StarIcon />}
                          onClick={() =>
                            completeTask(
                              task.input,
                              index,
                              task.difficulty,
                              task.id,
                              task.description
                            )
                          }
                        ></IconButton>
                        <Divider orientation="vertical" />

                        <IconButton
                          bg={"yellow.500"}
                          icon={<EditIcon />}
                          aria-label={""}
                          onClick={() => addAndEdit(task.id)}
                        />
                        <EditModal />

                        <Divider orientation="vertical" />
                        <IconButton
                          aria-label={""}
                          bg={"red.600"}
                          icon={<DeleteIcon />}
                          onClick={() => deleteTask(index)}
                        ></IconButton>
                      </HStack>
                    </Container>
                  </Flex>
                  <Divider />
                </VStack>
              ))}
          </TabPanel>
          <TabPanel>
            {taskListItems
              .filter((task: any) => task.status === "complete")
              .map((task: any) => (
                <>
                  <VStack key={task.index}>
                    <Flex w={"100%"} flexDir={"row"} my={4}>
                      <HStack>
                        <DifficultyCircle color={task.difficulty} />
                        <Container
                          w={"100%"}
                          textAlign={"left"}
                          maxW={"100%"}
                          wordBreak={"break-all"}
                        >
                          {task.input}
                        </Container>
                      </HStack>
                    </Flex>
                    <Container
                      w={"100%"}
                      textAlign={"left"}
                      maxW={"100%"}
                      wordBreak={"break-all"}
                      mt={2}
                    >
                      {task.description}
                    </Container>
                  </VStack>
                  <Divider />
                </>
              ))}
          </TabPanel>
          {/* <TabPanel>
        Expired here
      </TabPanel> */}
        </TabPanels>
      </Tabs>
    ) : (
      <></>
    );

  const calculateColor = (xp: number) => {
    // Calculate color based on XP value
    const colors = [
      "lightblue",
      "darkblue",
      "lightgreen",
      "darkgreen",
      "red",
      "orange",
    ];

    console.log(xp);

    if (xp > 600) return "gold";

    const index = Math.floor((xp / 1000) * (colors.length - 1));

    return colors[index];
  };

  return (
    <Box
      bg={{
        base: useColorModeValue("rgba(255,255,255,0.1)", "rgba"),
        md: useColorModeValue("rgba(255,255,255,0)", "rgba(0,0,0,0)"),
      }}
    >
      <div className="text-white flex justify-center text-center mt-6">
        <Text
          fontSize="xl"
          color={calculateColor(XP)}
          transition="color 0.2s"
          sx={{
            "@keyframes pulsateOpacity": {
              "0%": {
                opacity: 0.6,
              },
              "50%": {
                opacity: 1,
              },
              "100%": {
                opacity: 0.6,
              },
            },
            animation: "pulsateOpacity 1s infinite",
          }}
        >
          XP BAR - Level {Math.floor(XP / 100)}
        </Text>
      </div>
      <Flex color={"red"} w={"100%"} justifyContent={"center"}>
        <Progress
          sx={{
            "& > div:first-child": {
              transitionProperty: "width",
            },
          }}
          colorScheme="pink"
          value={XP % 100}
          w={700}
          hasStripe
          isAnimated
          max={100}
        />
      </Flex>

      <Mountain xp={XP} />

      <Flex
        w="100%"
        h="100vh"
        flexDir="column"
        mt="5%"
        color={useColorModeValue("bgDark.900", "white")}
      >
        <Container
          w="100%"
          maxH={{ base: "100%", lg: 1800 }}
          bg={useColorModeValue("rgba(255,255,255,0.3)", "rgba(0,0,0,0.6)")}
          rounded={{ base: "", lg: "3xl" }}
          p={8}
          maxW={"5xl"}
        >
          <Text fontWeight="700" fontSize="30" textAlign="center">
            Tasks
          </Text>
          <Divider borderWidth={"1px"} />
          <form onSubmit={addTask}>
            <FormControl>
              <Flex
                justifyContent={"center"}
                color={useColorModeValue("bgDark.900", "white")}
                mt={4}
              >
                <VStack>
                  <Text fontWeight="700" fontSize="20" textAlign="center">
                    Difficulty
                  </Text>
                  <RadioGroup
                    onChange={setRadioDifficulty}
                    value={radioDifficulty}
                  >
                    <Stack spacing={20} direction="row" mt={2}>
                      <Radio colorScheme="green" value="green.500">
                        Easy
                      </Radio>
                      <Radio colorScheme="orange" value="orange.500">
                        Medium
                      </Radio>
                      <Radio colorScheme="red" value="red.500">
                        Hard
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </VStack>
              </Flex>
              <Flex mt="2%">
                {/* variant='flushed' */}
                <Input
                  placeholder="Title"
                  w="100%"
                  value={input}
                  color={useColorModeValue("bgDark.900", "white")}
                  _placeholder={{ color: "inherit" }}
                  onChange={(event) => setInput(event.target.value)}
                />
                <Button
                  sx={{ width: "90px" }}
                  ml="5"
                  bg="blue.400"
                  onClick={addTask}
                >
                  {loading ? (
                    <CircularProgress
                      isIndeterminate
                      size="40px"
                      color="blue.300"
                    />
                  ) : (
                    <p>Add Task</p>
                  )}
                </Button>
              </Flex>
              <Textarea
                mt={4}
                color={useColorModeValue("bgDark.900", "white")}
                _placeholder={{ color: "inherit" }}
                placeholder="Description (optional)"
                resize={"none"}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              {triggerDisplayAlert(alertText)}
            </FormControl>
          </form>
          <Divider borderWidth={"1px"} mt={4} />
          {taskList()}
        </Container>
      </Flex>

      <div className="lg:h-screen"></div>
    </Box>
  );
};

export default TaskList;
