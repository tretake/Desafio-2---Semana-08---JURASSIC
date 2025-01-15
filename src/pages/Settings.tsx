import Button from '../components/Button';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../redux/pageSlice";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { User } from "../interface/types";

const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useUser();

  useEffect(() => {
    dispatch(setPage("settings"));
  }, [dispatch]);
  console.log("user", user);

  const [file, setFile] = useState<File | null>(null);

  const tempPhotoUrl = user?.imageUrl || "./src/assets/profile_picture.jpg";
  const [isModalVisible, setModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      console.log("usuarioLogado", usuarioLogado);

      const tempPhotoUrl = URL.createObjectURL(event.target.files[0]);
      setUsuarioLogado((prev) => ({
        ...prev,
        photo: tempPhotoUrl,
        hasImage: true,
      }));
    }
    event.target.value = "";
  };

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
    setUsuarioLogado((prev) => ({
      ...prev,
      photo: user?.imageUrl,
      hasImage: user?.hasImage || false,
    }));
  };

  const [usuarioLogado, setUsuarioLogado] = useState<User>({
    id: 0,
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    userName: "",
    createdAt: "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    photo: user?.imageUrl || "",
    password: "",
    hasImage: user?.hasImage || false,
    role: user?.unsafeMetadata?.jobposition || "Usuário",
    projects: [],
    tasks: [],
    notifications: [],
    social: {
      twitter: user?.unsafeMetadata?.twitter || "",
      instagram: user?.unsafeMetadata?.instagram || "",
      linkedin: user?.unsafeMetadata?.linkedin || "",
    },
  });

  console.log("usuarioLogado", usuarioLogado);

  const handleInputChange = (field: keyof User["social"], value: string) => {
    setUsuarioLogado((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        [field]: value,
      },
    }));
  };

  const uploadProfilePicture = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    const base64 = await convertToBase64(file);
    await user?.setProfileImage({ file: base64 });
  };

  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleUpdate = async () => {
    try {
      await user?.update({
        firstName: usuarioLogado.firstName,
        lastName: usuarioLogado.lastName,
        unsafeMetadata: {
          twitter: usuarioLogado.social.twitter,
          instagram: usuarioLogado.social.instagram,
          linkedin: usuarioLogado.social.linkedin,
        },
      });
      if (file) {
        await uploadProfilePicture();
      }
      setModalVisible(true);
    } catch (error) {
      console.error("Erro ao atualizar as informações:", error);
      alert("Erro ao atualizar as informações. Tente novamente.");
    }
  };

  useEffect(() => {
    if (isModalVisible) {
      let timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      if (countdown <= 0) {
        setModalVisible(false);
        setCountdown(10);
      }

      return () => clearInterval(timer);
    }
  });

  return (
    <div className="m-5 lg:mx-24 divide-y-2 flex flex-col gap-[19px]   ">
      <section>
        <div className="flex py-[65px]">
          <img
            className="size-28 md:size-[174px] rounded-full drop-shadow-[0px_2px_2px_rgba(0,0,0,0.50)] "
            src={
              usuarioLogado.hasImage
                ? user?.imageUrl
                : "./src/assets/profile_picture.jpg"
            }
            alt="profile image"
          />
          <div className="ml-4 flex flex-col justify-center ">
            <h1 className="  text-3xl font-bold">
              {` ${usuarioLogado.firstName} ${usuarioLogado.lastName}`}{" "}
            </h1>
            <p className=" opacity-70 text-xs md:text-xl">
              {usuarioLogado.email}
            </p>
            <p className=" opacity-70 ">{usuarioLogado.role}</p>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-medium">Project profile</h1>
          <p className="opacity-70 text-sm">
            Update your profile information in the sections below.
          </p>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row lg:gap-[224px] py-[19px]">
        <div className="max-w-[401px]">
          <h2 className="text-xl font-semibold ">Basic information</h2>
          <p className=" mb-[19px]  opacity-70 leading-10 text-sm ">
            Update your name and e-mail in this section. Note: this information
            will be public to all your project colleagues and can be changed
            anytime.
          </p>
        </div>
        <div className="flex flex-wrap gap-[13px]  max-w-[800px]">
          <label className="font-semibold   mr-[10px] " htmlFor="">
            First name <br />
            <input
              className="border px-3 py-2  rounded-md w-[297px] font-normal "
              type="text"
              placeholder="New first name"
            />
          </label>
          <label className="font-semibold " htmlFor="">
            Last name <br />
            <input
              className="border px-3 py-2 rounded-md w-[297px] font-normal "
              type="text"
              placeholder="New last name"
            />
          </label>
          <label className="font-semibold  grow " htmlFor="">
            E-mail <br />
            <input
              className="border px-3 pt-2 rounded-md font-normal w-[297px] md:w-[617px]  "
              type="text"
              placeholder="New e-mail"
            />
          </label>
        </div>
      </section>
      <section className=" flex flex-col lg:flex-row lg:gap-[224px]  py-[19px]">
        <div className="max-w-[401px] ">
          <h2 className="text-xl font-bold">Profile picture</h2>
          <p className="  opacity-70 leading-10 text-sm">
            Update your profile picture. Supported files are JPG, PNG, WebP and
            JPEG.
          </p>
        </div>
        <div className="flex flex-col grow md:flex-row gap-[21px] ">
          <img
            className="w-[175px] h-[181px] rounded-full "
            src={usuarioLogado.hasImage ? usuarioLogado.photo : tempPhotoUrl}
            alt="profile image"
          />
          <label className="font-medium text-sm grow max-w-[410px]" htmlFor="">
            Add new profile picture
            <div className="bg-blue-100   border-[1px] border-blue-400 rounded-md p-3  flex justify-between items-center ">
              <div className=" flex items-center gap-1 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-[18px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                  />
                </svg>
                <p>{file ? file.name : "imageattachment.jpg"}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-[18px] cursor-pointer"
                onClick={removeFile}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
            <div
              className=" flex flex-col items-center justify-center h-[152px] my-[10px] border-dashed border-blue-400 rounded-md border-[2px]  text-center cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById("taskCoverInput")?.click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-[24px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>

              <h1 className="my-3">
                Drop here to attach or{" "}
                <span className="text-[#5570F1]"> upload </span>{" "}
              </h1>
              <p>Max size: 5GB</p>
            </div>
            <input
              type="file"
              className="hidden"
              id="taskCoverInput"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </section>
      <section className="flex flex-col lg:flex-row lg:gap-[224px]  py-[19px]">
        <div className="max-w-[401px]">
          <h2 className="text-xl font-bold  py-[19px]">Communication</h2>
          <p className="opacity-70 leading-10 py-[19px] ">
            Update your e-mail communication preferences anytime. Choose to
            receive project notifications or disable them completely.
          </p>
        </div>
        <ul>
          <li>
            <label className="flex gap-2 items-center " htmlFor="">
              <input
                className="peer relative appearance-none 
                          w-5 h-5   outline outline-1 outline-offset-1
                          rounded-[6px] outline-gray-400
                          cursor-pointer  
                          checked:bg-[#5570F1] "
                type="checkbox"
              />
              New tasks
            </label>
            <p className="py-2 text-sm">
              Receive an e-mail alert each time a new task is assigned to me in
              a project.
            </p>
          </li>
          <li>
            <label className="flex gap-2 items-center " htmlFor="">
              <input
                className="peer relative appearance-none 
                          w-5 h-5   outline outline-1 outline-offset-1
                          rounded-[6px] outline-gray-400
                          cursor-pointer  
                          checked:bg-[#5570F1] "
                type="checkbox"
              />
              New team members
            </label>
            <p className="py-2 text-sm">
              Receive an e-mail alert each time a team members enters in a
              project I’m assigned to.
            </p>
          </li>
          <li>
            <label className="flex gap-2 items-center " htmlFor="">
              <input
                className="peer relative appearance-none 
                          w-5 h-5   outline outline-1 outline-offset-1
                          rounded-[6px] outline-gray-400
                          cursor-pointer  
                          checked:bg-[#5570F1] "
                type="checkbox"
              />
              Weekly reports
            </label>
            <p className="py-2 text-sm">
              Receive a weekly e-mail with a basic report, including estimated
              time and most active members.
            </p>
          </li>
        </ul>
      </section>
      <section className="flex flex-col lg:flex-row lg:gap-[224px]  py-[19px]">
        <div className="max-w-[401px]">
          <h2 className="text-xl font-bold py-[19px]">Social information</h2>
          <p className=" opacity-70 leading-10 ">
            Update your e-mail communication preferences anytime. Choose to
            receive project notifications or disable them completely.
          </p>
        </div>

        <div>
          <h1 className="w-full text-xs text-[#5E6366] mb-[9px] ">Twitter/X</h1>
          <label className="flex flex-row gap-2 " htmlFor="">
            <input
              className=" grow-0 w-52 border py-2 px-4  rounded-md "
              type="text"
              placeholder="x.com/"
              value={usuarioLogado.social.twitter}
              onChange={(e) => handleInputChange("twitter", e.target.value)}
            />
            <input
              className=" max-w-[158px] grow border p-1 rounded-md min-w-0"
              type="text"
              placeholder="TheJohnDoe"
            />
          </label>
          <h1 className="w-full text-xs text-[#5E6366] mb-[9px]">Instagram</h1>
          <label className="flex flex-row gap-2 " htmlFor="">
            <input
              className=" grow-0 w-52 border py-2 px-4  rounded-md "
              type="text"
              placeholder="instagram.com/"
              value={usuarioLogado.social.instagram}
              onChange={(e) => handleInputChange("instagram", e.target.value)}
            />
            <input
              className=" max-w-[158px] grow border p-1 rounded-md min-w-0"
              type="text"
              placeholder="TheJohnDoe"
            />
          </label>
          <h1 className="w-full text-xs text-[#5E6366] mb-[9px]">Linkedin</h1>
          <label className="flex flex-row gap-2 " htmlFor="">
            <input
              className=" grow-0 w-52 border py-2 px-4  rounded-md "
              type="text"
              placeholder="linkedin.com/in/"
              value={usuarioLogado.social.linkedin}
              onChange={(e) => handleInputChange("linkedin", e.target.value)}
            />
            <input
              className="  max-w-[158px] grow border p-1 rounded-md min-w-0"
              type="text"
              placeholder="TheJohnDoe"
            />
          </label>
        </div>
      </section>
      <div className=" my-12 flex flex-col items-center  border-none">
        <Button
          label="Update information"
          type="button"
          kind="primary"
          size="lg"
          onClick={handleUpdate}
        />
        <p className="my-[17px]">
          Never mind, take me{" "}
          <Link className="text-[#5570F1] underline" to="/kanban">
            back to my project.
          </Link>
        </p>
      </div>
      {/* Modal */}
      {isModalVisible && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Update Successful</h2>
            <p className="text-sm mb-4">
              Your information has been updated successfully!
            </p>
            <div className="flex justify-around items-center">
              <span className="text-gray-500 text-sm">
                Closing in {countdown}s
              </span>
              <button
                className="btnClose mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setModalVisible(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings
