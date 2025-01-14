import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteTask, fetchTasks } from '../redux/thunks/tasksThunks';

interface CardProps {
  id: number;
  label: string;
  priority: "High" | "Mid" | "Low";
  color: "purple" | "orange" | "green";
  image?: string;
  percent: number;
}

const KanbanCard: React.FC<CardProps> = ({
  id,
  label,
  priority,
  color,
  image,
  percent,
}) => {

  const percentage: number = percent;

  const dispatch = useDispatch();

  const handleDelete = async (taskId: string) => {
    await dispatch(deleteTask(taskId));
    dispatch(fetchTasks());
  };

  const getPriorityColor = () => {
    switch (priority) {
      case "High":
        return "text-white bg-[#BD2323]";
      case "Mid":
        return "text-[#F59E0B] bg-[#FFFBEB]";
      case "Low":
        return "text-[#4F46E5] bg-[#EEF2FF]";
    }
  };
  const getColor = (target: "item" | "bg") => {
    switch (color) {
      case "purple":
        return target === "bg" ? "#EEF2FF" : "#4F46E5";
      case "orange":
        return target === "bg" ? "#FCE6C2" : "#F59E0B";
      case "green":
        return target === "bg" ? "#C7F0D6" : "#22C55E";
    }
  };

  const imageFile = (base64: string): string => {
    const result = URL.createObjectURL(convertFromBase64(base64, "image"));
    return result.toString();
  };

  const convertFromBase64 = (base64: string, fileName: string): File => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "";
    const binary = atob(arr[1]);
    const arrayBuffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      arrayBuffer[i] = binary.charCodeAt(i);
    }
    return new File([arrayBuffer], fileName, { type: mime });
  };

  return (
    <div
      className={`bg-white flex flex-col 
    p-3 w-[278px]  rounded-3xl }`}
    >
      {image ? (
        <img className=" mb-4 w-[246px]  rounded-2xl " src={image} alt="" />
      ) : (
        <></>
      )}

      <div>
        <div className="flex justify-between">
          <div
            className={` ${getPriorityColor()} rounded-full text-center font-semibold
        text-sm w-[41px] h-6 `}
          >
            {priority}
          </div>

          <button
            className={` hover:bg-red-200  rounded-full hover:scale-125`}
            onClick={() => handleDelete(id)} // Usa a prop `id` diretamente
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={` text-red-400  size-6`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <h1
          className="font-bold 
        text-base mt-3"
        >
          {label}
        </h1>
      </div>

      <div className="my-4">
        <div className="flex justify-between text-sm">
          <p className="text-[#475569] ">Progress</p>
          <p className="font-bold"> {percentage}%</p>
        </div>
        <div className="w-full bg-[#E2E8F0] rounded-full h-2 ">
          <div
            className={` bg-[${getColor("item")}] h-2 rounded-full  `}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex text-[4.9px] md:text-[4.9px] lg:text-sm font-extrabold  ">
          <img
            className="rounded-full border-2 border-white border-box  w-8 translate-x-[-0]   "
            src="./images/profile_picture.jpg"
            alt=""
          />
          <img
            className="rounded-full border-2 border-white border-box  w-8 translate-x-[-10px] "
            src="./images/profile_picture.jpg"
            alt=""
          />
          <img
            className="rounded-full border-2 border-white border-box  w-8 translate-x-[-20px]"
            src="./images/profile_picture.jpg"
            alt=""
          />
          <img
            className="rounded-full border-2 border-white border-box  w-8 translate-x-[-30px]"
            src="./images/profile_picture.jpg"
            alt=""
          />
          <div
            className={`text-[${getColor("item")}] bg-[${getColor(
              "bg"
            )}]   p-2  rounded-full border-2 border-white border-box   w-8 h-8 translate-x-[-40px]   flex items-center justify-center text-sm   `}
          >
            +3
          </div>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="6"
            className="size-5"
            viewBox="0 0 7 6"
            fill="none"
          >
            <path
              d="M3.35762 0.0465393C2.6286 0.0473399 1.92966 0.337298 1.41417 0.852796C0.898669 1.36829 0.608711 2.06723 0.60791 2.79625V5.10601C0.60791 5.22269 0.654262 5.3346 0.73677 5.41711C0.819277 5.49961 0.931181 5.54597 1.04786 5.54597H3.35762C4.08689 5.54597 4.78629 5.25626 5.30196 4.74059C5.81763 4.22492 6.10734 3.52552 6.10734 2.79625C6.10734 2.06698 5.81763 1.36758 5.30196 0.851912C4.78629 0.33624 4.08689 0.0465393 3.35762 0.0465393ZM2.14775 3.23621C2.08249 3.23621 2.01869 3.21685 1.96443 3.1806C1.91017 3.14434 1.86788 3.09281 1.8429 3.03251C1.81793 2.97222 1.81139 2.90587 1.82412 2.84187C1.83686 2.77786 1.86828 2.71907 1.91443 2.67292C1.96057 2.62677 2.01937 2.59535 2.08338 2.58262C2.14738 2.56988 2.21373 2.57642 2.27402 2.60139C2.33432 2.62637 2.38585 2.66866 2.42211 2.72292C2.45836 2.77718 2.47771 2.84098 2.47771 2.90624C2.47771 2.99375 2.44295 3.07768 2.38107 3.13956C2.31919 3.20144 2.23526 3.23621 2.14775 3.23621ZM3.35762 3.23621C3.29236 3.23621 3.22857 3.21685 3.1743 3.1806C3.12004 3.14434 3.07775 3.09281 3.05277 3.03251C3.0278 2.97222 3.02127 2.90587 3.034 2.84187C3.04673 2.77786 3.07816 2.71907 3.1243 2.67292C3.17045 2.62677 3.22924 2.59535 3.29325 2.58262C3.35726 2.56988 3.4236 2.57642 3.4839 2.60139C3.54419 2.62637 3.59572 2.66866 3.63198 2.72292C3.66824 2.77718 3.68759 2.84098 3.68759 2.90624C3.68759 2.99375 3.65282 3.07768 3.59094 3.13956C3.52906 3.20144 3.44514 3.23621 3.35762 3.23621ZM4.5675 3.23621C4.50224 3.23621 4.43844 3.21685 4.38418 3.1806C4.32992 3.14434 4.28762 3.09281 4.26265 3.03251C4.23767 2.97222 4.23114 2.90587 4.24387 2.84187C4.2566 2.77786 4.28803 2.71907 4.33418 2.67292C4.38032 2.62677 4.43912 2.59535 4.50312 2.58262C4.56713 2.56988 4.63348 2.57642 4.69377 2.60139C4.75406 2.62637 4.8056 2.66866 4.84185 2.72292C4.87811 2.77718 4.89746 2.84098 4.89746 2.90624C4.89746 2.99375 4.8627 3.07768 4.80082 3.13956C4.73894 3.20144 4.65501 3.23621 4.5675 3.23621Z"
              fill="#94A3B8"
            />
          </svg>
          <span className=":text-base  font-semibold mr-4 ">111</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="6"
            className="size-5"
            viewBox="0 0 7 6"
            fill="none"
          >
            <path
              d="M3.32601 0.0465393C2.76042 0.0465393 2.20752 0.214258 1.73725 0.528486C1.26697 0.842714 0.900436 1.28934 0.683992 1.81188C0.467548 2.33442 0.410916 2.90941 0.521258 3.46414C0.6316 4.01887 0.903961 4.52842 1.3039 4.92835C1.70383 5.32829 2.21338 5.60065 2.76811 5.71099C3.32284 5.82134 3.89783 5.7647 4.42037 5.54826C4.94291 5.33182 5.38954 4.96528 5.70377 4.49501C6.01799 4.02473 6.18571 3.47184 6.18571 2.90624C6.18491 2.14805 5.88337 1.42114 5.34724 0.885011C4.81112 0.348886 4.08421 0.04734 3.32601 0.0465393ZM4.58153 2.40194L3.04169 3.94178C3.02126 3.96224 2.997 3.97846 2.9703 3.98953C2.94359 4.0006 2.91497 4.0063 2.88606 4.0063C2.85715 4.0063 2.82852 4.0006 2.80182 3.98953C2.77511 3.97846 2.75085 3.96224 2.73042 3.94178L2.07049 3.28185C2.02922 3.24057 2.00603 3.18459 2.00603 3.12622C2.00603 3.06784 2.02922 3.01186 2.07049 2.97058C2.11177 2.92931 2.16775 2.90612 2.22613 2.90612C2.2845 2.90612 2.34048 2.92931 2.38176 2.97058L2.88606 3.47516L4.27026 2.09068C4.2907 2.07024 4.31496 2.05403 4.34167 2.04296C4.36837 2.0319 4.39699 2.02621 4.4259 2.02621C4.4548 2.02621 4.48342 2.0319 4.51012 2.04296C4.53683 2.05403 4.56109 2.07024 4.58153 2.09068C4.60197 2.11111 4.61818 2.13538 4.62924 2.16208C4.6403 2.18878 4.646 2.21741 4.646 2.24631C4.646 2.27521 4.6403 2.30383 4.62924 2.33054C4.61818 2.35724 4.60197 2.38151 4.58153 2.40194Z"
              fill="#94A3B8"
            />
          </svg>
          <span className="text-base font-semibold">444</span>
        </div>
      </div>
    </div>
  );
};

export default KanbanCard




