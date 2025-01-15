import React, { useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from 'react-redux';
import { postNewTask } from "../redux/thunks/tasksThunks";
import { useNavigate } from "react-router-dom";
import { Task } from "../interface/types";
import { AppDispatch } from "../redux/store";
import { Vortex } from "react-loader-spinner";


const Modal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const users = useSelector((state) => state.users.value);


  const [photo, setPhoto] = useState<Base64URLString | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [people, setPeople] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const generateId = (): number => Date.now();


  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (event, user) => {
    const { checked } = event.target;

    if (checked) {
      setCreatedBy(user.email);
      setSelectedUsers((prev) => [...prev, user.firstName]);
    } else {
      setSelectedUsers((prev) =>
        prev.filter((selected) => selected !== user.firstName)
      );

      if (createdBy === user.firstName) {
        setCreatedBy("");
      }
    }
  };


  const newTask: Task = {
    id: generateId(),
    title: title,
    description: description,
    startDate: startDate,
    startTime: startTime,
    endDate: endDate,
    endTime: endTime,
    status: status,
    priority: priority as "High" | "Mid" | "Low",
    people,
    commentsCount: 0,
    completedTasksCount: 0,
    progress: 0,
    estimatedTime: "",
    photo: photo || "",
    createdBy: createdBy
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      try {
        const base64 = await convertToBase64(selectedFile);
        setPhoto(base64);
      } catch (error) {
        console.error("Erro ao converter arquivo para Base64:", error);
      }
    }
  };
  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = () => {
    setFile(null);
  };

  const addPerson = (person: string) => {
    if (person && !people.includes(person)) {
      setPeople([...people, person]);
    }
  };

  const removePerson = (person: string) => {
    setPeople(people.filter((p) => p !== person));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim() || title.length < 5) {
      newErrors.title = "Title must be at least 5 characters long";
    }

    if (!startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!endDate) {
      newErrors.endDate = "End date is required";
    }

    if (
      new Date(`${startDate}T${startTime}`) >
        new Date(`${endDate}T${endTime}`) ||
      new Date(`${startDate}`) > new Date(`${endDate}`)
    ) {
      newErrors.endDate =
        "End date and time cannot be before start date and time";
    }

    if (!status) {
      newErrors.status = "Status is required";
    }

    if (!priority) {
      newErrors.priority = "Priority is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      console.log(newTask);
      
      try {
        await dispatch(postNewTask(newTask));
        setLoading(false);
        onClose();
        navigate("/kanban");
      } catch (error) {
        console.error("Error creating task", error);
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute  inset-0 z-50 flex  items-center  bg-black bg-opacity-50">
      <div className="overflow-y-auto max-h-full self-center mt-8  pt-4 pl-11 md:pr-5 lg:pr-11 pr-10 pb-6 w-[343px] sm:w-[491px] md:w-[691px]  lg:w-[1001px]  h-min-[584px] mx-auto bg-white rounded-lg shadow-md">
        {" "}
        <div className="flex items-center justify-between md:pr-0 lg:pr-5">
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-80 z-50">
              <Vortex
                visible={true}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={["red", "green", "blue", "yellow", "orange", "purple"]}
              />
            </div>
          )}

          <h2 className="text-2xl font-semibold text-[#160A60]">
            Create new task
          </h2>
          <button onClick={onClose} className="cursor-pointer">
            <img src="src/assets/icons/X_icon.png" alt="Ícone de X" />
          </button>
        </div>
        <form
          className="flex flex-col gap-16 text-sm font-medium text-[#331436] lg:flex-row"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col flex-1">
            <div>
              <div className="mt-4">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="mt-1 h-9 w-full pl-3 rounded-md border border-gray-200 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter the title of the task"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && (
                  <p className="text-red-600 text-sm">{errors.title}</p>
                )}
              </div>
              <div className="mt-[18px]">
                <label>Status</label>
                <div className="flex items-center space-x-4 mt-[10px]">
                  <div className="flex items-center space-x-2">
                    <input
                      className="peer relative appearance-none w-5 h-5 outline outline-1 outline-offset-1 rounded-[6px] outline-gray-400 cursor-pointer checked:bg-[#5570F1]"
                      type="radio"
                      name="status"
                      value="todo"
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <label htmlFor="todo" className="text-sm text-[#2b2f32]">
                      To do
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      className="peer relative appearance-none w-5 h-5 outline outline-1 outline-offset-1 rounded-[6px] outline-gray-400 cursor-pointer checked:bg-[#F59E0B]"
                      type="radio"
                      name="status"
                      value="inprogress"
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <label
                      htmlFor="inprogress"
                      className="text-sm text-[#2b2f32]"
                    >
                      In progress
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      className="peer relative appearance-none w-5 h-5 outline outline-1 outline-offset-1 rounded-[6px] outline-gray-400 cursor-pointer checked:bg-[#22C55E]"
                      type="radio"
                      name="status"
                      value="done"
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <label htmlFor="done" className="text-sm text-[#2b2f32]">
                      Done
                    </label>
                  </div>
                </div>
                {errors.status && (
                  <p className="text-red-600 text-sm">{errors.status}</p>
                )}
              </div>
              <div className="mt-6">
                <label htmlFor="description">Description</label>
                <textarea
                  className="mt-1 block h-[113px] pl-3 pt-2 w-full rounded-md border border-gray-300 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter a description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={300}
                ></textarea>
                {errors.description && (
                  <p className="text-red-600 text-sm">{errors.description}</p>
                )}
              </div>
              <div className="flex gap-2 items-end">
                <div className="mt-[18px] w-[185px]">
                  <label htmlFor="startDate">Start Date</label>
                  <div className="relative text-gray-400 font-normal">
                    <img
                      src="src/assets/icons/calendar.png"
                      alt="Ícone de calendário"
                      className="mt-1 w-6 mx-auto absolute top-1/2 left-3 transform -translate-y-1/2"
                    />
                    <input
                      type="date"
                      className="mt-2 w-full h-[52px] rounded-md border border-gray-300 sm:text-sm pl-12"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-[18px] w-[107px]">
                  <div className="relative text-gray-400 font-normal">
                    <img
                      src="src/assets/icons/clock.png"
                      alt="Ícone de calendário"
                      className="mt-1 w-6 mx-auto absolute top-1/2 left-3 transform -translate-y-1/2"
                    />
                    <input
                      type="time"
                      className="mt-2 w-full h-[52px] rounded-md border border-gray-300 sm:text-sm pl-12"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {errors.startDate && (
                <p className="text-red-600 text-sm">{errors.startDate}</p>
              )}
              <div className="flex gap-2 items-end">
                <div className="mt-[18px] w-[185px]">
                  <label htmlFor="endDate">End Date</label>
                  <div className="relative text-gray-400 font-normal">
                    <img
                      src="src/assets/icons/calendar.png"
                      alt="Ícone de calendário"
                      className="mt-1 w-6 mx-auto absolute top-1/2 left-3 transform -translate-y-1/2"
                    />
                    <input
                      type="date"
                      className="mt-2 w-full h-[52px] rounded-md border border-gray-300 sm:text-sm pl-12"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-[18px] w-[107px]">
                  <div className="relative text-gray-400 font-normal">
                    <img
                      src="src/assets/icons/clock.png"
                      alt="Ícone de calendário"
                      className="mt-1 w-6 mx-auto absolute top-1/2 left-3 transform -translate-y-1/2"
                    />
                    <input
                      type="time"
                      className="mt-2 w-full h-[52px] rounded-md border border-gray-300 sm:text-sm pl-12"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {errors.endDate && (
                <p className="text-red-600 text-sm">{errors.endDate}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col flex-1 md:w-full lg:w-[350px] ">
            <div className="mt-6">
              <div>
                <label htmlFor="taskCover">Task cover</label>
              </div>
              <div className="flex justify-end pt-0 pb-2 h-3 md:w-max-[350px] lg:w-[410px]">
                <small className="text-[#4F46E5]">optional</small>
              </div>

              {file && (
                <div className="mt-2">
                  <div className="flex items-center lg:w-[410px] h-[50px] justify-between p-2 bg-[#EFF6FF] rounded-md mb-2 border border-[#60A5FA]">
                    <div className="flex gap-2 items-center">
                      <img
                        className="w-[18px]"
                        src="src/assets/icons/attach.png"
                        alt="Ícone para anexar arquivo"
                      />
                      <span className="text-sm text-gray-700">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800 text-sm font-bold"
                      onClick={removeFile}
                    >
                      <img
                        className="w-[18px]"
                        src="src/assets/icons/recycle.png"
                        alt="Ícone de lixeira"
                      />
                    </button>
                  </div>
                </div>
              )}

              <div
                className="mt-[10px] p-4  lg:w-[410px] h-[152px] text-[#4B5563] flex flex-col justify-center gap-3 border border-dashed border-[#60A5FA] rounded-md text-center cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() =>
                  document.getElementById("taskCoverInput")?.click()
                }
              >
                <img
                  className="w-6 mx-auto"
                  src="src/assets/icons/system.png"
                  alt="Ícone de upload"
                />
                <p className="text-base">
                  Drop here to attach or{" "}
                  <span className="text-[#4F46E5]">upload</span>
                </p>
                <p className="text-xs">Max size: 5GB</p>
              </div>

              <input
                type="file"
                className="hidden"
                id="taskCoverInput"
                onChange={handleFileChange}
              />
            </div>

            <div>
              <div className="mt-[25px] lg:w-[410px]">
                <label htmlFor="people">Add people</label>
                <div className="relative w-full ">
                  <input
                    type="text"
                    placeholder="Buscar usuário..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <img
                    src="src/assets/icons/search.png"
                    alt="Ícone de busca"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
                  />
                </div>

                <form>
                  {searchTerm && (
                    <div className="max-h-28 overflow-y-auto border border-gray-300 rounded-md p-2 mb-4">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <div
                            key={user.id}
                            className="flex items-center mb-2 last:mb-0"
                          >
                            <input
                              type="checkbox"
                              id={`user-${user.id}`}
                              value={user.email}
                              className="mr-2"
                              onChange={(e) => handleCheckboxChange(e, user)}
                            />

                            <label
                              htmlFor={`user-${user.id}`}
                              className="text-gray-700"
                            >
                              {user.firstName}
                            </label>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">
                          Nenhum usuário encontrado.
                        </p>
                      )}
                    </div>
                  )}
                </form>
              </div>
              <div className="mt-6">
                <label>Priority</label>
                <div className="flex items-center space-x-4 mt-[10px] gap-8">
                  <div className="flex items-center space-x-2">
                    <input
                      className="peer relative appearance-none w-5 h-5 outline outline-1 outline-offset-1 rounded-[6px] outline-gray-300 cursor-pointer checked:bg-[#5570F1]"
                      type="radio"
                      name="priority"
                      value="Low"
                      onChange={(e) => setPriority(e.target.value)}
                    />
                    <label htmlFor="low" className="text-sm text-gray-700">
                      Low
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 w-[80px]">
                    <input
                      className="peer relative appearance-none w-5 h-5 outline outline-1 outline-offset-1 rounded-[6px] outline-gray-300 cursor-pointer checked:bg-[#F59E0B]"
                      type="radio"
                      name="priority"
                      value="Mid"
                      onChange={(e) => setPriority(e.target.value)}
                    />
                    <label htmlFor="mid" className="text-sm text-gray-700">
                      Mid
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      className="peer relative appearance-none w-5 h-5 outline outline-1 outline-offset-1 rounded-[6px] outline-gray-300 cursor-pointer checked:bg-[#22C55E]"
                      type="radio"
                      name="priority"
                      value="High"
                      onChange={(e) => setPriority(e.target.value)}
                    />
                    <label htmlFor="high" className="text-sm text-gray-700">
                      High
                    </label>
                  </div>
                </div>
                {errors.priority && (
                  <p className="text-red-600 text-sm">{errors.priority}</p>
                )}
              </div>
              <div className="mt-8 flex justify-center w-full  lg:w-[410px] md:justify-start ">
                <Button
                  label="Create!"
                  size="full"
                  kind="create"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
