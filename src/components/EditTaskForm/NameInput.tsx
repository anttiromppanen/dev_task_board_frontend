import { Dispatch, SetStateAction } from "react";

function NameInput({
  nameInputValue,
  setNameInputValue,
}: {
  nameInputValue: string;
  setNameInputValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <label htmlFor="name">
      Task name
      <input
        type="text"
        id="name"
        value={nameInputValue}
        onChange={(e) => setNameInputValue(e.target.value)}
        placeholder="Enter task name"
        className="mt-1 block rounded-xl border-2 border-userLightGrey px-4 py-2 placeholder:font-light focus:outline-userBlue"
      />
    </label>
  );
}

export default NameInput;
