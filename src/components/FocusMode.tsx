import React, { useState, useEffect, useRef, PropsWithChildren } from "react";
import styled from "styled-components";
import {
  CircularProgress,
  CircularProgressLabel,
  Box,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

const Button = styled.button`
  background-color: lightgreen;
  color: black;
  font-size: auto;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  transition: 0.25s;
  border-radius: 8px;
  border: 2px solid transparent;
  border-color: black;
  width: 200px;
`;

const CircleTimer = ({
  timerValue,
  onTimerComplete,
}: PropsWithChildren<{ timerValue: number; onTimerComplete: () => void }>) => {
  const [timeLeft, setTimeLeft] = useState(timerValue);
  const [isRunning, setIsRunning] = useState(false);

  const animationRef = useRef<number | null>(null);

  // Update timeLeft when timerValue prop changes
  useEffect(() => {
    setTimeLeft(timerValue);
  }, [timerValue]);

  useEffect(() => {
    let startTime: number | null = null;

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const deltaTime = timestamp - startTime;

      if (isRunning && timeLeft > 0) {
        setTimeLeft((prevTime: number) => {
          const updatedTime = prevTime - Math.floor(deltaTime / 1000);
          if (updatedTime <= 0) {
            setIsRunning(false);
            onTimerComplete();
            return 0;
          }
          return updatedTime;
        });
      }

      animationRef.current = requestAnimationFrame(updateProgress);
    };

    if (isRunning) {
      animationRef.current = requestAnimationFrame(updateProgress);
    }

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null; // Set it to null when animation is canceled
      }
    };
  }, [isRunning, timeLeft, onTimerComplete]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerValue);
  };

  return (
    <div>
      <Box textAlign="center">
        <CircularProgress
          value={(timerValue - timeLeft) * (100 / timerValue)}
          color="purple.400"
          size="120px"
        >
          <CircularProgressLabel>{timeLeft}</CircularProgressLabel>
        </CircularProgress>
      </Box>
      <Flex justifyContent="center">
        <Button onClick={startTimer} disabled={isRunning}>
          Start
        </Button>
        <Button onClick={resetTimer} disabled={!isRunning}>
          Reset
        </Button>
      </Flex>
    </div>
  );
};

const FocusMode = () => {
  const minMinutes = 5;
  const maxMinutes = 90;
  const [value, setValue] = useState(minMinutes);

  const handleChange = (valueAsNumber: number) => {
    setValue(valueAsNumber);
  };

  const handleTimerComplete = () => {
    alert("Timer completed!");

    // Here you can add XP - you can add terribly but quickly by adding a task and make the name just "focus", with the XP.
  };

  return (
    <div className="mx-auto text-center flex flex-col justify-center bg-green-200 bg-opacity-0 text-white">
      <br />
      <p className="text-xl text-black">Focus Mode</p>
      <p>Earn Some XP by focusing</p>
      <ul>
        <div className="flex justify-center p-20 mx-auto text-center">
          <ul>
            <li>
              {/* Display the CircleTimer component */}
              <CircleTimer
                timerValue={value * 60}
                onTimerComplete={handleTimerComplete}
              />
            </li>
          </ul>
        </div>
        <li>Set time in minutes</li>
        <li className="bg-white bg-opacity-40 mx-80">
          <Flex w="90%" color="black">
            <NumberInput
              maxW="100px"
              mr="2rem"
              value={value}
              onChange={(newValue) => handleChange(parseInt(newValue))}
              max={maxMinutes}
              min={minMinutes}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Slider
              flex="1"
              focusThumbOnChange={false}
              value={value}
              onChange={handleChange}
              max={maxMinutes}
              min={minMinutes}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb fontSize="sm" boxSize="32px" children={value} />
            </Slider>
          </Flex>
        </li>
        <li className="text-xl">{value}</li>
      </ul>
    </div>
  );
};

export default FocusMode;
